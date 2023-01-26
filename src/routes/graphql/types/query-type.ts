import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import { RoutesErrors } from '../../utils/routes-errors';
import { FastifyType } from './fastify-type';
import { memberTypeType } from './member-type-type';
import { postType } from './post-type';
import { profileType } from './profile-type';
import { userType } from './user-type';
import * as usersController from '../../utils/users-controller';
import * as profilesController from '../../utils/profiles-controller';

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
      resolve: () => fastify.db.posts.findMany(),
    },

    memberTypes: {
      type: new GraphQLList(memberTypeType),
      resolve: () => fastify.db.memberTypes.findMany(),
    },

    user: {
      type: userType,
      args: {
        id: {
          description: 'id of the human',
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: async (_: any, { id }: any) => usersController.findOne(fastify, id),
    },

    profile: {
      type: profileType,
      args: {
        id: {
          description: 'id of the Profile',
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: async (_: any, { id }: any) => profilesController.findOne(fastify, id),
    },

    post: {
      type: postType,
      args: {
        id: {
          description: 'id of the Post',
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: async (_: any, { id }: any) => {
        const found = await fastify.db.posts.findOne({ key: 'id', equals: id });
        if (!found) throw fastify.httpErrors.notFound(RoutesErrors.postNotFound);

        return found;
      },
    },

    memberType: {
      type: memberTypeType,
      args: {
        id: {
          description: 'id of the Member Type',
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: async (_: any, { id }: any) => {
        const found = await fastify.db.memberTypes.findOne({ key: 'id', equals: id });
        if (!found) throw fastify.httpErrors.notFound(RoutesErrors.memberTypeNotFound);

        return found;
      },
    },
  }),
});
