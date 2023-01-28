import { FastifyInstance } from 'fastify';
import { GraphQLObjectType, GraphQLList } from 'graphql';
import { UserEntity } from '../../../../utils/DB/entities/DBUsers';
import { userType } from './user';
import * as usersController from '../../../utils/users-controller';
import { ThrowError } from '../../../utils/throw-error';

export const userWithAllSubscriptionsType = new GraphQLObjectType({
  name: 'userWithAllSubscriptionsType',
  fields: () => ({
    user: {
      type: userType,
      resolve: async (user: UserEntity) => user,
    },

    userSubscribedTo: {
      type: new GraphQLList(userType),
      resolve: async ({ id }: UserEntity, _: unknown, fastify: FastifyInstance) =>
        usersController.findUserSubscribedTo(fastify, id, ThrowError.no),
    },

    subscribedToUser: {
      type: new GraphQLList(userType),
      resolve: async ({ id }: UserEntity, _: unknown, fastify: FastifyInstance) =>
        usersController.findSubscribedToUser(fastify, id, ThrowError.no),
    },
  }),
});
