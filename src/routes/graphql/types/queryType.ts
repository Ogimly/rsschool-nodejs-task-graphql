import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import { FastifyInstance, RawServerDefault, FastifyBaseLogger } from 'fastify';
import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import { IncomingMessage, ServerResponse } from 'http';
import { FromSchemaDefaultOptions } from 'json-schema-to-ts';
import { RoutesErrors } from '../../const/routes-errors';
import { memberTypeType } from './memberTypeType';
import { postType } from './postType';
import { profileType } from './profileType';
import { userType } from './userType';

export const getQueryType = (
  fastify: FastifyInstance<
    RawServerDefault,
    IncomingMessage,
    ServerResponse<IncomingMessage>,
    FastifyBaseLogger,
    JsonSchemaToTsProvider<FromSchemaDefaultOptions>
  >
) => ({
  name: 'RootQueryType',
  fields: () => ({
    users: {
      type: new GraphQLList(userType),
      resolve: () => fastify.db.users.findMany(),
    },

    profiles: {
      type: new GraphQLList(profileType),
      resolve: () => fastify.db.profiles.findMany(),
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
      resolve: async (_: any, { id }: any) => {
        const found = await fastify.db.users.findOne({ key: 'id', equals: id });
        if (!found) throw fastify.httpErrors.notFound(RoutesErrors.userNotFound);

        return found;
      },
    },

    profile: {
      type: profileType,
      args: {
        id: {
          description: 'id of the Profile',
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: async (_: any, { id }: any) => {
        const found = await fastify.db.profiles.findOne({ key: 'id', equals: id });
        if (!found) throw fastify.httpErrors.notFound(RoutesErrors.profileNotFound);

        return found;
      },
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
