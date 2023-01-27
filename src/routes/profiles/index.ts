import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema } from '../../utils/reusedSchemas';
import { createProfileBodySchema, changeProfileBodySchema } from './schema';
import type { ProfileEntity } from '../../utils/DB/entities/DBProfiles';
import * as profilesController from '../utils/profiles-controller';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (fastify): Promise<void> => {
  fastify.get(
    '/',
    async (): Promise<ProfileEntity[]> => profilesController.findMany(fastify)
  );

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async (request): Promise<ProfileEntity | null> =>
      profilesController.findOne(fastify, request.params.id)
  );

  fastify.post(
    '/',
    {
      schema: {
        body: createProfileBodySchema,
      },
    },
    async (request): Promise<ProfileEntity> =>
      profilesController.create(fastify, request.body)
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async (request): Promise<ProfileEntity> =>
      profilesController.deleteOne(fastify, request.params.id)
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        body: changeProfileBodySchema,
        params: idParamSchema,
      },
    },
    async (request): Promise<ProfileEntity> =>
      profilesController.update(fastify, request.params.id, request.body)
  );
};

export default plugin;
