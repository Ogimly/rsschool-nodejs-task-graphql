import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { graphql, GraphQLObjectType, GraphQLSchema } from 'graphql';
import { graphqlBodySchema } from './schema';
import { getQueryType } from './types/queryType';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (fastify): Promise<void> => {
  fastify.post(
    '/',
    {
      schema: {
        body: graphqlBodySchema,
      },
    },
    async function (request, reply) {
      const { query } = request.body;

      if (query) {
        const graphqlQuerySchema = new GraphQLSchema({
          query: new GraphQLObjectType(getQueryType(fastify)),
        });

        return await graphql({ schema: graphqlQuerySchema, source: request.body.query });
      }

      return 'Query is empty';
    }
  );
};

export default plugin;
