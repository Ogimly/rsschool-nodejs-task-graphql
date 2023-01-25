import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema } from '../../utils/reusedSchemas';
import { createProfileBodySchema, changeProfileBodySchema } from './schema';
import type { ProfileEntity } from '../../utils/DB/entities/DBProfiles';
import { RoutesErrors } from '../const/routes-errors';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (fastify): Promise<void> => {
  fastify.get('/', async function (request, reply): Promise<ProfileEntity[]> {
    return fastify.db.profiles.findMany();
  });

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<ProfileEntity> {
      const { id } = request.params;
      const found = await fastify.db.profiles.findOne({ key: 'id', equals: id });

      if (!found) throw fastify.httpErrors.notFound(RoutesErrors.profileNotFound);

      return found;
    }
  );

  fastify.post(
    '/',
    {
      schema: {
        body: createProfileBodySchema,
      },
    },
    async function (request, reply): Promise<ProfileEntity> {
      let id = request.body.userId;
      const userFound = await fastify.db.users.findOne({ key: 'id', equals: id });

      if (!userFound) throw fastify.httpErrors.badRequest(RoutesErrors.userNotFound);

      id = request.body.memberTypeId;
      const memberTypeFound = await fastify.db.memberTypes.findOne({
        key: 'id',
        equals: id,
      });

      if (!memberTypeFound)
        throw fastify.httpErrors.badRequest(RoutesErrors.memberTypesNotFound);

      const { userId } = request.body;
      const found = await fastify.db.profiles.findOne({ key: 'userId', equals: userId });

      if (found) throw fastify.httpErrors.badRequest(RoutesErrors.userHasProfile);

      const { body } = request;
      return fastify.db.profiles.create(body);
    }
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<ProfileEntity> {
      const { id } = request.params;

      const found = await fastify.db.profiles.findOne({ key: 'id', equals: id });
      if (!found) throw fastify.httpErrors.badRequest(RoutesErrors.profileNotFound);

      return fastify.db.profiles.delete(id);
    }
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        body: changeProfileBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<ProfileEntity> {
      const { id } = request.params;

      const found = await fastify.db.profiles.findOne({ key: 'id', equals: id });
      if (!found) throw fastify.httpErrors.badRequest(RoutesErrors.profileNotFound);

      const { body } = request;
      return fastify.db.profiles.change(id, body);
    }
  );
};

export default plugin;
