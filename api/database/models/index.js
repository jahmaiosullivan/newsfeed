import sequelize from '../sequelize';
import User, { comparePassword } from './User';
import UserClaim from './UserClaim';
import Comment from './Comment';
import Post from './Post';
import City from './City';

User.hasMany(UserClaim, {
  foreignKey: 'userid',
  as: 'claims',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

Post.hasMany(Comment, {
  onUpdate: 'cascade',
  onDelete: 'cascade'
});
Comment.belongsTo(Post);


function sync(...args) {
  return sequelize.sync(...args);
}

export default { sync };
export { User, UserClaim, Post, Comment, City, comparePassword };