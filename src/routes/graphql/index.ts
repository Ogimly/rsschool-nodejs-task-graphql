import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { graphql, GraphQLSchema, parse, validate } from 'graphql';
import * as graphqlDepthLimit from 'graphql-depth-limit';
import { DEPTH_LIMIT } from '../utils/const';
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
      const { query, variables } = request.body;

      if (query) {
        const errors = validate(graphqlQuerySchema, parse(query!), [
          graphqlDepthLimit(DEPTH_LIMIT),
        ]);

        if (errors.length !== 0) {
          return { errors, data: null };
        }

        return await graphql({
          schema: graphqlQuerySchema,
          source: query,
          variableValues: variables,
          contextValue: fastify,
        });
      }

      return 'Request is empty';
    }
  );
};

export default plugin;
