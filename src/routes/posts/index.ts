import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema } from '../../utils/reusedSchemas';
import { createPostBodySchema, changePostBodySchema } from './schema';
import type { PostEntity } from '../../utils/DB/entities/DBPosts';
import * as postsController from '../utils/posts-controller';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (fastify): Promise<void> => {
  fastify.get('/', async (): Promise<PostEntity[]> => postsController.findMany(fastify));

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async (request): Promise<PostEntity | null> =>
      postsController.findOne(fastify, request.params.id)
  );

  fastify.post(
    '/',
    {
      schema: {
        body: createPostBodySchema,
      },
    },
    async (request): Promise<PostEntity> => postsController.create(fastify, request.body)
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async (request): Promise<PostEntity> =>
      postsController.deleteOne(fastify, request.params.id)
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        body: changePostBodySchema,
        params: idParamSchema,
      },
    },
    async (request): Promise<PostEntity> =>
      postsController.update(fastify, request.params.id, request.body)
  );
};

export default plugin;
