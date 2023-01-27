import { FastifyInstance } from 'fastify';
import { GraphQLList, GraphQLObjectType } from 'graphql';
import { UserEntity } from '../../../../utils/DB/entities/DBUsers';
import { userWithFullProfileType } from './user-profile';
import { userType } from './user';
import * as usersController from '../../../utils/users-controller';
import { ThrowError } from '../../../utils/throw-error';

export const userWithSubscribedToFullProfile = new GraphQLObjectType({
  name: 'userWithSubscribedToFullProfile',
  fields: () => ({
    user: {
      type: userType,
      resolve: async (user: UserEntity) => user,
    },

    subscribedTo: {
      type: new GraphQLList(userWithFullProfileType),
      resolve: async ({ id }: UserEntity, _: unknown, fastify: FastifyInstance) =>
        usersController.findUserSubscribedTo(fastify, id, ThrowError.no),
    },
  }),
});
