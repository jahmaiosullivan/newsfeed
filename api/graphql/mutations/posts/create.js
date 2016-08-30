import PostType, { PostFields } from '../../types/PostType';
import { Post, Tag } from '../../../database/models';
import { createAuthorizedGraphQLQuery } from '../../graphQLHelper';
import underscore from 'lodash';

const mutationFunction = (values) => {
  const tagName = "Walking";
  return Post.create(values).then((createdPost) => {
    return Tag.findOne({
      where: {name: {$iLike: tagName} }
    }).then((tag) => {
      if(!tag) {
        return Tag.create({
          name: tagName,
          description: "For those who like to run",
          createdBy: values.createdBy,
          updatedBy: values.createdBy
        }).then((createdTag) => {
          return createdPost.addTag(createdTag).then(() => {
            return createdPost;
          });
        })
      }
      else {
        return createdPost.addTag(tag).then(() => {
          return createdPost;
        });
      }
    });
  });
};

export default createAuthorizedGraphQLQuery(PostType, underscore.omit(PostFields, ['id', 'comments']), mutationFunction);

