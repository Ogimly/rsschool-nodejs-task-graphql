import { GraphQLList } from 'graphql';
import { FastifyType } from './fastify-type';
import { memberTypeType } from './member-type-type';
import { postType } from './post-type';
import { profileType } from './profile-type';
import { userType } from './user-type';
import * as usersController from '../../utils/users-controller';
import * as profilesController from '../../utils/profiles-controller';
import * as postsController from '../../utils/posts-controller';
import * as memberTypeController from '../../utils/member-type-controller';
import { idType, uuidType } from './reused-types';

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
