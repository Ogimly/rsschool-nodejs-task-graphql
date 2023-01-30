import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema } from '../../utils/reusedSchemas';
import {
  createUserBodySchema,
  changeUserBodySchema,
  subscribeBodySchema,
} from './schemas';
import type { UserEntity } from '../../utils/DB/entities/DBUsers';
import * as usersController from '../utils/users-controller';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (fastify): Promise<void> => {
  fastify.get('/', async (): Promise<UserEntity[]> => usersController.findMany(fastify));

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async (request): Promise<UserEntity> =>
      usersController.findOne(fastify, request.params.id)
  );

  fastify.post(
    '/',
    {
      schema: {
        body: createUserBodySchema,
      },
    },
    async (request): Promise<UserEntity> => usersController.create(fastify, request.body)
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async (request): Promise<UserEntity> =>
      usersController.deleteOne(fastify, request.params.id)
  );

  // /users/user1Id/subscribeTo body{ "userId": "user2Id" } <===> user2.subscribedToUserIds.push(user1Id)
  fastify.post(
    '/:id/subscribeTo',
    {
      schema: {
        body: subscribeBodySchema,
        params: idParamSchema,
      },
    },
    async (request): Promise<UserEntity> =>
      usersController.subscribe(fastify, request.body.userId, request.params.id)
  );

  fastify.post(
    '/:id/unsubscribeFrom',
    {
      schema: {
        body: subscribeBodySchema,
        params: idParamSchema,
      },
    },
    async (request): Promise<UserEntity> =>
      usersController.unsubscribe(fastify, request.body.userId, request.params.id)
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        body: changeUserBodySchema,
        params: idParamSchema,
      },
    },
    async (request): Promise<UserEntity> =>
      usersController.update(fastify, request.params.id, request.body)
  );
};

export default plugin;
