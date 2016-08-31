import sequelize from '../sequelize';
import User, { comparePassword } from './User';
import UserClaim from './UserClaim';
import Comment from './Comment';
import Post from './Post';
import Tag from './Tag';
import City from './City';
import _ from 'lodash';
import util from 'util';

_.mixin({
  'getProperty': function(collection, property) {
    return _(collection).filter(item => item[property] !== null)
                        .map(item => item[property])
                        .uniqBy(itemProperty => itemProperty)
                        .value();
  }
});

User.hasMany(UserClaim, {
  foreignKey: 'userid',
  as: 'claims',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

Post.hasMany(Comment, {
  foreignKey: 'postId',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});
Comment.belongsTo(Post, {as: 'post'});

const postTagJoinTable = 'postTags';
Tag.belongsToMany(Post, {through: postTagJoinTable, foreignKey: 'tagId'});
Post.belongsToMany(Tag, {through: postTagJoinTable, foreignKey: 'postId'});
Post.afterFind(function(posts) {
  const findTags = (whereClause) => {
    return Tag.findAll({
      attributes: ['Tag.*'],
      include: [{
        model: Post,
        required: true,
        attributes: [],
        duplicating: false,
        through: {
          attributes: [],
          where: whereClause
        }
      }],
      raw: true
    })
  };
  const isArray = posts.constructor === Array;
  const postIds = isArray ? _.getProperty(posts, "id"): [posts.id];

  return sequelize.Promise.resolve(findTags({postId: {in: postIds}}).then((tags) => {
    if (isArray) {
      _.each( posts, (post, i) => {
        posts[i].tags = _.filter( tags, (tag) => {
          return tag[`Posts.${postTagJoinTable}.postId`] === post.id;
        });
      });
    }
    else {
      posts.tags = tags;
    }
    return posts;
  }));
});

function sync(...args) {
  return sequelize.sync(...args);
}

export default { sync };
export { User, UserClaim, Post, Comment, City, Tag, comparePassword };