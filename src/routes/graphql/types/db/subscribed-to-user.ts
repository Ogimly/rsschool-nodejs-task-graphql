import { FastifyInstance } from 'fastify';
import { GraphQLList, GraphQLObjectType } from 'graphql';
import { UserEntity } from '../../../../utils/DB/entities/DBUsers';
import { userWithPostsType } from './user-posts';
import { userType } from './user';
import * as usersController from '../../../utils/users-controller';
import { ThrowError } from '../../../utils/throw-error';

export const userWithSubscribedToUserType = new GraphQLObjectType({
  name: 'userWithSubscribedToUserType',
  fields: () => ({
    user: {
      type: userType,
      resolve: async (user: UserEntity) => user,
    },

    subscribedToUser: {
      type: new GraphQLList(userWithPostsType),
      resolve: async ({ id }: UserEntity, _: unknown, fastify: FastifyInstance) =>
        usersController.findSubscribedToUser(fastify, id, ThrowError.no),
    },
  }),
});
