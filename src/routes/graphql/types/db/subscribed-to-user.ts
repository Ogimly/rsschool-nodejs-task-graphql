import { FastifyInstance } from 'fastify';
import { GraphQLList, GraphQLObjectType } from 'graphql';
import { UserEntity } from '../../../../utils/DB/entities/DBUsers';
import { userType } from './user';
import { postType } from './post';
import * as usersController from '../../../utils/users-controller';
import * as postsController from '../../../utils/posts-controller';
import { ThrowError } from '../../../utils/throw-error';

export const userWithSubscribedToUserType = new GraphQLObjectType({
  name: 'userWithSubscribedToUserType',
  fields: () => ({
    user: {
      type: userType,
      resolve: async (user: UserEntity) => user,
    },

    subscribedToUser: {
      type: new GraphQLList(userType),
      resolve: async ({ id }: UserEntity, _: unknown, fastify: FastifyInstance) =>
        usersController.findSubscribedToUser(fastify, id, ThrowError.no),
    },

    posts: {
      type: new GraphQLList(postType),
      resolve: async ({ id }: UserEntity, _: unknown, fastify: FastifyInstance) =>
        postsController.findManyByUserId(fastify, id),
    },
  }),
});
