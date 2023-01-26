import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema } from '../../utils/reusedSchemas';
import { changeMemberTypeBodySchema } from './schema';
import type { MemberTypeEntity } from '../../utils/DB/entities/DBMemberTypes';
import * as memberTypeController from '../utils/member-type-controller';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (fastify): Promise<void> => {
  fastify.get(
    '/',
    async (): Promise<MemberTypeEntity[]> => memberTypeController.findMany(fastify)
  );

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async (request): Promise<MemberTypeEntity> =>
      memberTypeController.findOne(fastify, request.params.id)
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        body: changeMemberTypeBodySchema,
        params: idParamSchema,
      },
    },
    async (request): Promise<MemberTypeEntity> =>
      memberTypeController.update(fastify, request.params.id, request.body)
  );
};

export default plugin;
