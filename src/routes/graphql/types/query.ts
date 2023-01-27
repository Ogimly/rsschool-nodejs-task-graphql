import { GraphQLList } from 'graphql';
import { FastifyType } from './fastify';
import { memberTypeType } from './db/member-type';
import { postType } from './db/post';
import { profileType } from './db/profile';
import { userType } from './db/user';
import * as usersController from '../../utils/users-controller';
import * as profilesController from '../../utils/profiles-controller';
import * as postsController from '../../utils/posts-controller';
import * as memberTypeController from '../../utils/member-type-controller';
import { idType, uuidType } from './reused';

export const getQueryType = (fastify: FastifyType) => ({
  name: 'RootQueryType',
  fields: () => ({
    users: {
      type: new GraphQLList(userType),
      resolve: () => usersController.findMany(fastify),
    },

    profiles: {
      type: new GraphQLList(profileType),
      resolve: () => profilesController.findMany(fastify),
    },

    posts: {
      type: new GraphQLList(postType),
      resolve: () => postsController.findMany(fastify),
    },

    memberTypes: {
      type: new GraphQLList(memberTypeType),
      resolve: () => memberTypeController.findMany(fastify),
    },

    user: {
      type: userType,
      args: {
        id: uuidType,
      },
      resolve: async (_: any, { id }: any) => usersController.findOne(fastify, id),
    },

    profile: {
      type: profileType,
      args: {
        id: uuidType,
      },
      resolve: async (_: any, { id }: any) => profilesController.findOne(fastify, id),
    },

    post: {
      type: postType,
      args: {
        id: uuidType,
      },
      resolve: async (_: any, { id }: any) => postsController.findOne(fastify, id),
    },

    memberType: {
      type: memberTypeType,
      args: {
        id: idType,
      },
      resolve: async (_: any, { id }: any) => memberTypeController.findOne(fastify, id),
    },
  }),
});
