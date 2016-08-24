import {Post, Comment } from '../../../database/models';
import sequelize from '../../../database/sequelize';
import config from '../../../../config';
import util from 'util';
import {
  GraphQLList as List,
  GraphQLInt as IntType,
} from 'graphql';
import PostType from '../../types/PostType';

export default  {
  type: new List(PostType),
  args: {
    page: {type: IntType}
  },
  resolve({user}, { page }) {
    console.log(`finding posts now for user ${util.inspect(user)}`);
    const offset = page * config.paging.rows - config.paging.rows;
    const postsQuery = `Select "Posts".*, count(*) as "commentCount" from Posts as "Posts"
                        LEFT OUTER JOIN Comments as "Comments" ON "Comments"."postId" = "Posts"."id"
                        group by "Posts"."id"
                        order by "Posts"."createdAt" DESC
                        LIMIT :limit OFFSET :offset`;
    const variables = { offset, limit: config.paging.rows };

    return new Promise((resolve) => {
      resolve(sequelize.query(postsQuery, { replacements: variables, model: Post, type: sequelize.QueryTypes.SELECT }).then((posts) => {
          return posts;
        }));
    });
  }
};
