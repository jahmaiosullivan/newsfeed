import PostType from '../../types/PostWithTagsType';
import { Post, Tag } from '../../../database/models';
import { createAuthorizedGraphQLQuery } from '../../graphQLHelper';
import util from 'util';

import {
  GraphQLString as StringType
} from 'graphql';

const mutationFunction = (values) => {

  const addTagsToPost = (createdPost, item, cb) => {
    Tag.findOrCreate({where: {name: {$iLike: item.trim()} }, defaults: {
        name: item.trim(),
        description: '',
        createdBy: values.createdBy,
        updatedBy: values.createdBy
    }}).spread((createdTag) => {
      createdPost.addTag(createdTag).then(() => {
        cb();
      });
    });
  };

  return Post.create(values).then((createdPost) => {
    let savedTags = values.tags.split(',').reduce((promiseChain, tag) => {
      return promiseChain.then( () => new Promise( (resolve) => {
        addTagsToPost( createdPost, tag, resolve );
      }));
    }, Promise.resolve() );

    // Add the tags to the post manually
    return savedTags.then( () => {
      createdPost.tags = createdPost.getTags();
      return createdPost;
    });
  });
};

const args = {
  title: { type: StringType },
  body: { type: StringType },
  images: { type: StringType },
  tags: { type: StringType },
  createdAt: { type: StringType },
  createdBy: { type: StringType },
  updatedAt: { type: StringType },
  updatedBy: { type: StringType }
};

export default createAuthorizedGraphQLQuery(PostType, args, mutationFunction);

