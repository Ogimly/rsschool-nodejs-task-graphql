import { FastifyInstance } from 'fastify';
import { GraphQLList, GraphQLObjectType } from 'graphql';
import { UserEntity } from '../../../../utils/DB/entities/DBUsers';
import { userType } from './user';
import { profileType } from './profile';
import * as usersController from '../../../utils/users-controller';
import * as profilesController from '../../../utils/profiles-controller';
import { ThrowError } from '../../../utils/throw-error';
import { profileWithMemberTypeType } from './profile-member-type';

export const userWithUserSubscribedToType = new GraphQLObjectType({
  name: 'userWithUserSubscribedToType',
  fields: () => ({
    user: {
      type: userType,
      resolve: async (user: UserEntity) => user,
    },

    profile: {
      type: profileType,
      resolve: async ({ id }: UserEntity, _: unknown, fastify: FastifyInstance) =>
        profilesController.findOneByUserId(fastify, id, ThrowError.no),
    },

    profileWithMemberType: {
      type: profileWithMemberTypeType,
      resolve: async ({ id }: UserEntity, _: unknown, fastify: FastifyInstance) =>
        profilesController.findOneByUserId(fastify, id, ThrowError.no),
    },

    userSubscribedTo: {
      type: new GraphQLList(userType),
      resolve: async ({ id }: UserEntity, _: unknown, fastify: FastifyInstance) =>
        usersController.findUserSubscribedTo(fastify, id, ThrowError.no),
    },
  }),
});
