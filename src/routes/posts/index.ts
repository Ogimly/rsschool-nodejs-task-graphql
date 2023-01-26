import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema } from '../../utils/reusedSchemas';
import { createPostBodySchema, changePostBodySchema } from './schema';
import type { PostEntity } from '../../utils/DB/entities/DBPosts';
import { RoutesErrors } from '../utils/routes-errors';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (fastify): Promise<void> => {
  fastify.get('/', async function (request, reply): Promise<PostEntity[]> {
    return fastify.db.posts.findMany();
  });

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<PostEntity> {
      const { id } = request.params;
      const found = await fastify.db.posts.findOne({ key: 'id', equals: id });

      if (!found) throw fastify.httpErrors.notFound(RoutesErrors.postNotFound);

      return found;
    }
  );

  fastify.post(
    '/',
    {
      schema: {
        body: createPostBodySchema,
      },
    },
    async function (request, reply): Promise<PostEntity> {
      const { body } = request;
      return fastify.db.posts.create(body);
    }
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<PostEntity> {
      const { id } = request.params;

      const found = await fastify.db.posts.findOne({ key: 'id', equals: id });
      if (!found) throw fastify.httpErrors.badRequest(RoutesErrors.postNotFound);

      return fastify.db.posts.delete(id);
    }
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        body: changePostBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<PostEntity> {
      const { id } = request.params;

      const found = await fastify.db.posts.findOne({ key: 'id', equals: id });
      if (!found) throw fastify.httpErrors.badRequest(RoutesErrors.postNotFound);

      const { body } = request;
      return fastify.db.posts.change(id, body);
    }
  );
};

export default plugin;
