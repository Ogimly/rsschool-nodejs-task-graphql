import { GraphQLList, GraphQLObjectType } from 'graphql';
import { FastifyInstance } from 'fastify';
import { stringType, uuidType } from './reused';
import { userType } from './db/user';
import { profileType } from './db/profile';
import { postType } from './db/post';
import { memberTypeType } from './db/member-type';
import { userWithAllEntitiesType } from './db/user-all-entities';
import * as usersController from '../../utils/users-controller';
import * as profilesController from '../../utils/profiles-controller';
import * as postsController from '../../utils/posts-controller';
import * as memberTypeController from '../../utils/member-type-controller';

const usersWithAllEntities = {
  type: new GraphQLList(userWithAllEntitiesType),
  resolve: async (_: unknown, __: unknown, fastify: FastifyInstance) =>
    usersController.findMany(fastify),
};

const userWithAllEntities = {
  type: userWithAllEntitiesType,
  args: {
    id: uuidType,
  },
  resolve: async (_: unknown, { id }: any, fastify: FastifyInstance) =>
    usersController.findOne(fastify, id),
};

export const QueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    users: {
      type: new GraphQLList(userType),
      resolve: (_: unknown, __: unknown, fastify: FastifyInstance) =>
        usersController.findMany(fastify),
    },

    profiles: {
      type: new GraphQLList(profileType),
      resolve: (_: unknown, __: unknown, fastify: FastifyInstance) =>
        profilesController.findMany(fastify),
    },

    posts: {
      type: new GraphQLList(postType),
      resolve: (_: unknown, __: unknown, fastify: FastifyInstance) =>
        postsController.findMany(fastify),
    },

    memberTypes: {
      type: new GraphQLList(memberTypeType),
      resolve: (_: unknown, __: unknown, fastify: FastifyInstance) =>
        memberTypeController.findMany(fastify),
    },

    user: {
      type: userType,
      args: {
        id: uuidType,
      },
      resolve: async (_: unknown, { id }: any, fastify: FastifyInstance) =>
        usersController.findOne(fastify, id),
    },

    profile: {
      type: profileType,
      args: {
        id: uuidType,
      },
      resolve: async (_: unknown, { id }: any, fastify: FastifyInstance) =>
        profilesController.findOne(fastify, id),
    },

    post: {
      type: postType,
      args: {
        id: uuidType,
      },
      resolve: async (_: unknown, { id }: any, fastify: FastifyInstance) =>
        postsController.findOne(fastify, id),
    },

    memberType: {
      type: memberTypeType,
      args: {
        id: stringType,
      },
      resolve: async (_: unknown, { id }: any, fastify: FastifyInstance) =>
        memberTypeController.findOne(fastify, id),
    },

    usersWithAllEntities: usersWithAllEntities,

    userWithAllEntities: userWithAllEntities,

    usersWithUserSubscribedTo: usersWithAllEntities,

    userWithSubscribedToUser: userWithAllEntities,

    usersWithAllSubscriptions: usersWithAllEntities,
  }),
});
