import { FastifyInstance } from 'fastify';
import { GraphQLList, GraphQLObjectType } from 'graphql';
import { UserEntity } from '../../../../utils/DB/entities/DBUsers';
import { userType } from './user';
import * as postController from '../../../utils/posts-controller';
import { postType } from './post';

export const userWithPostsType = new GraphQLObjectType({
  name: 'userWithPostsType',
  fields: () => ({
    user: {
      type: userType,
      resolve: async (user: UserEntity) => user,
    },

    posts: {
      type: new GraphQLList(postType),
      resolve: async ({ id }: UserEntity, _: unknown, fastify: FastifyInstance) =>
        postController.findManyByUserId(fastify, id),
    },
  }),
});
