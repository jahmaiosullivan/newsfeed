import sequelize from '../sequelize';
import User, { comparePassword } from './User';
import UserClaim from './UserClaim';
import Comment from './Comment';
import Post from './Post';
import Tag from './Tag';
import City from './City';

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

Tag.belongsToMany(Post, {as: 'Post', through: 'postTags', foreignKey: 'tagId'});
Post.belongsToMany(Tag, {as: 'Tag', through: 'postTags', foreignKey: 'postId'});

function sync(...args) {
  return sequelize.sync(...args);
}

export default { sync };
export { User, UserClaim, Post, Comment, City, Tag, comparePassword };