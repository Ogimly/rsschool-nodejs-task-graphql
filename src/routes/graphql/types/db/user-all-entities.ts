import { FastifyInstance } from 'fastify';
import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLOutputType,
  GraphQLString,
} from 'graphql';
import { UserEntity } from '../../../../utils/DB/entities/DBUsers';
import { profileType } from './profile';
import { memberTypeType } from './member-type';
import { profileWithMemberTypeType } from './profile-member-type';
import { postType } from './post';
import { uuidType, stringType } from '../reused';
import * as usersController from '../../../utils/users-controller';
import * as profilesController from '../../../utils/profiles-controller';
import * as postsController from '../../../utils/posts-controller';
import * as memberTypeController from '../../../utils/member-type-controller';
import { ThrowError } from '../../../utils/throw-error';

export const userWithAllEntitiesType: GraphQLOutputType = new GraphQLObjectType({
  name: 'userWithAllEntitiesType',
  fields: () => ({
    id: uuidType,
    firstName: stringType,
    lastName: stringType,
    email: stringType,
    subscribedToUserIds: {
      type: new GraphQLList(GraphQLString),
    },

    profile: {
      type: profileType,
      resolve: async ({ id }: UserEntity, _: unknown, fastify: FastifyInstance) =>
        profilesController.findOneByUserId(fastify, id, ThrowError.no),
    },

    memberType: {
      type: memberTypeType,
      resolve: async ({ id }: UserEntity, _: unknown, fastify: FastifyInstance) => {
        const found = await profilesController.findOneByUserId(
          fastify,
          id,
          ThrowError.no
        );
        if (found)
          return memberTypeController.findOne(fastify, found.memberTypeId, ThrowError.no);

        return null;
      },
    },

    profileWithMemberType: {
      type: profileWithMemberTypeType,
      resolve: async ({ id }: UserEntity, _: unknown, fastify: FastifyInstance) =>
        profilesController.findOneByUserId(fastify, id, ThrowError.no),
    },

    posts: {
      type: new GraphQLList(postType),
      resolve: async ({ id }: UserEntity, _: unknown, fastify: FastifyInstance) =>
        postsController.findManyByUserId(fastify, id),
    },

    userSubscribedTo: {
      type: new GraphQLList(userWithAllEntitiesType),
      resolve: async ({ id }: UserEntity, _: unknown, fastify: FastifyInstance) =>
        usersController.findUserSubscribedTo(fastify, id, ThrowError.no),
    },

    subscribedToUser: {
      type: new GraphQLList(userWithAllEntitiesType),
      resolve: async ({ id }: UserEntity, _: unknown, fastify: FastifyInstance) =>
        usersController.findSubscribedToUser(fastify, id, ThrowError.no),
    },
  }),
});
