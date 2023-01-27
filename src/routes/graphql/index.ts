import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { graphql, GraphQLSchema } from 'graphql';
import { graphqlBodySchema } from './schema';
import { MutationType } from './types/mutation';
import { QueryType } from './types/query';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (fastify): Promise<void> => {
  const graphqlQuerySchema = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType,
  });

  fastify.post(
    '/',
    {
      schema: {
        body: graphqlBodySchema,
      },
    },
    async function (request, reply) {
      const { query, mutation, variables } = request.body;

      if (query) {
        return await graphql({
          schema: graphqlQuerySchema,
          source: query,
          variableValues: variables,
          contextValue: fastify,
        });
      }

      if (mutation) {
        return await graphql({
          schema: graphqlQuerySchema,
          source: mutation,
          variableValues: variables,
          contextValue: fastify,
        });
      }

      return 'Request is empty';
    }
  );
};

export default plugin;
