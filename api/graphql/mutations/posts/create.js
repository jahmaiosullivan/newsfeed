import PostType from '../../types/PostWithTagsType';
import { Post, Tag } from '../../../database/models';
import { createAuthorizedGraphQLQuery } from '../../graphQLHelper';
import util from 'util';

import {
  GraphQLString as StringType
} from 'graphql';

const mutationFunction = (values) => {
  return Post.create(values).then((createdPost) => {
    const tagsList = values.tags.split(',');

    let savedTags = tagsList.reduce((promiseChain, tag) => {
      return promiseChain.then( () => new Promise( (resolve) => {
        if (tag.trim() !== '') {
          Tag.findOrCreate( {
            where: {name: {$iLike: tag.trim()}}, defaults: {
              name: tag.trim(),
              description: '',
              createdBy: values.createdBy,
              updatedBy: values.createdBy
            }
          } ).spread( (createdTag) => {
            console.log( `about to add ${util.inspect( createdTag )}` );
            createdPost.addTag( createdTag ).then( () => {
              console.log( `added ${createdTag.name}` );
              resolve();
            } );
          } );
        }
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

