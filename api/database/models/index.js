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

Tag.belongsToMany(Post, {through: 'postTags'});
Post.belongsToMany(Tag, {through: 'postTags'});

function sync(...args) {
  return sequelize.sync(...args);
}

export default { sync };
export { User, UserClaim, Post, Comment, City, Tag, comparePassword };