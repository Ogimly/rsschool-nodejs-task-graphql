import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { graphql, GraphQLObjectType, GraphQLSchema } from 'graphql';
import { graphqlBodySchema } from './schema';
import { getMutationType } from './types/mutation-type';
import { getQueryType } from './types/query-type';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (fastify): Promise<void> => {
  const graphqlQuerySchema = new GraphQLSchema({
    query: new GraphQLObjectType(getQueryType(fastify)),
    mutation: new GraphQLObjectType(getMutationType(fastify)),
  });

  fastify.post(
    '/',
    {
      schema: {
        body: graphqlBodySchema,
      },
    },
    async function (request, reply) {
      const { query, mutation } = request.body;

      if (query) {
        return await graphql({ schema: graphqlQuerySchema, source: query });
      }

      if (mutation) {
        return await graphql({ schema: graphqlQuerySchema, source: mutation });
      }

      return 'Request is empty';
    }
  );
};

export default plugin;
