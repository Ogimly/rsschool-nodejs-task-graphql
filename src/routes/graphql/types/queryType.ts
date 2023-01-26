import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import { FastifyInstance, RawServerDefault, FastifyBaseLogger } from 'fastify';
import { GraphQLList } from 'graphql';
import { IncomingMessage, ServerResponse } from 'http';
import { FromSchemaDefaultOptions } from 'json-schema-to-ts';
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
  }),
});
