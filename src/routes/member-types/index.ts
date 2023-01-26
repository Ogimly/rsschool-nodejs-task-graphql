import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema } from '../../utils/reusedSchemas';
import { changeMemberTypeBodySchema } from './schema';
import type { MemberTypeEntity } from '../../utils/DB/entities/DBMemberTypes';
import { RoutesErrors } from '../const/routes-errors';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (fastify): Promise<void> => {
  fastify.get('/', async function (request, reply): Promise<MemberTypeEntity[]> {
    return fastify.db.memberTypes.findMany();
  });

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<MemberTypeEntity> {
      const { id } = request.params;
      const found = await fastify.db.memberTypes.findOne({ key: 'id', equals: id });

      if (!found) throw fastify.httpErrors.notFound(RoutesErrors.memberTypeNotFound);

      return found;
    }
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        body: changeMemberTypeBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<MemberTypeEntity> {
      const { id } = request.params;

      const found = await fastify.db.memberTypes.findOne({ key: 'id', equals: id });
      if (!found) throw fastify.httpErrors.badRequest(RoutesErrors.memberTypeNotFound);

      const { body } = request;
      return fastify.db.memberTypes.change(id, body);
    }
  );
};

export default plugin;
