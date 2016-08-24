import CommentType from '../../types/CommentType';
import { Comment } from '../../../database/models';
import { createAuthorizedGraphQLQuery } from '../../graphQLHelper';
import util from 'util';
import {
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull
} from 'graphql';


const createArgs = {
  body: {type: new NonNull( StringType )},
  postId: {type: IntType },
  status: {type: IntType }
};
const udpdateArgs = {
  body: {type: new NonNull( StringType )},
  status: {type: IntType }
};
const deleteCommentArgs = { id: {type: new NonNull( IntType )} };

const createCommentFunc = (values) => { return Comment.create(values); };
const updateCommentFunc = ({body, status}) => {
  console.log(`update a comment: ${util.inspect({body, status})}`);
  return Comment.find({ where: {id} }).then((comment) => {
    return comment.updateAttributes({status, body});
  });
};
const deleteCommentFunc = ({ id }) => {
  return Comment.destroy({ where: { id } }).then(() => {
    return { id };
  });
};

const Create = createAuthorizedGraphQLQuery(CommentType, createArgs, createCommentFunc);
const Update = createAuthorizedGraphQLQuery(CommentType, udpdateArgs, updateCommentFunc);
const Delete = createAuthorizedGraphQLQuery(CommentType, deleteCommentArgs, deleteCommentFunc);

export { Create, Update, Delete };