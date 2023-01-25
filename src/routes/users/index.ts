import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema } from '../../utils/reusedSchemas';
import {
  createUserBodySchema,
  changeUserBodySchema,
  subscribeBodySchema,
} from './schemas';
import type { UserEntity } from '../../utils/DB/entities/DBUsers';
import { RoutesErrors } from '../const/routes-errors';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (fastify): Promise<void> => {
  fastify.get('/', async function (request, reply): Promise<UserEntity[]> {
    return fastify.db.users.findMany();
  });

  fastify.get(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      const { id } = request.params;

      const found = await fastify.db.users.findOne({ key: 'id', equals: id });
      if (!found) throw fastify.httpErrors.notFound(RoutesErrors.userNotFound);

      return found;
    }
  );

  fastify.post(
    '/',
    {
      schema: {
        body: createUserBodySchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      const { body } = request;
      return fastify.db.users.create(body);
    }
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      const { id } = request.params;

      const found = await fastify.db.users.findOne({ key: 'id', equals: id });
      if (!found) throw fastify.httpErrors.badRequest(RoutesErrors.userNotFound);

      // del profile
      const foundProfile = await fastify.db.profiles.findOne({
        key: 'userId',
        equals: id,
      });
      if (foundProfile) await fastify.db.profiles.delete(foundProfile.id);

      // del all posts
      const foundPosts = await fastify.db.posts.findMany({ key: 'userId', equals: id });
      if (foundPosts)
        Promise.all(foundPosts.map(({ id }) => fastify.db.posts.delete(id)));

      // del all subscribes
      const foundSubscribes = await fastify.db.users.findMany({
        key: 'subscribedToUserIds',
        inArray: id,
      });
      // console.log('id', id);
      // console.log('AllUsers', await fastify.db.users.findMany());
      // console.log('foundSubscribes', foundSubscribes);

      if (foundSubscribes)
        Promise.all(
          foundSubscribes.map(({ id: userId, subscribedToUserIds }) => {
            const idx = subscribedToUserIds.findIndex((userId) => userId === id);
            subscribedToUserIds.splice(idx, 1);

            return fastify.db.users.change(userId, { subscribedToUserIds });
          })
        );

      return fastify.db.users.delete(id);
    }
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
    async function (request, reply): Promise<UserEntity> {
      const { userId: id } = request.body;

      const found = await fastify.db.users.findOne({ key: 'id', equals: id });
      if (!found) throw fastify.httpErrors.badRequest(RoutesErrors.userNotFound);

      const { subscribedToUserIds } = found;
      const { id: idToSubscribe } = request.params;

      if (!subscribedToUserIds.includes(idToSubscribe))
        subscribedToUserIds.push(idToSubscribe);

      return fastify.db.users.change(id, { subscribedToUserIds });
    }
  );

  fastify.post(
    '/:id/unsubscribeFrom',
    {
      schema: {
        body: subscribeBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      const { userId: id } = request.body;

      const found = await fastify.db.users.findOne({ key: 'id', equals: id });
      if (!found) throw fastify.httpErrors.badRequest(RoutesErrors.userNotFound);

      const { subscribedToUserIds } = found;
      const { id: idToUnsubscribe } = request.params;

      const idx = subscribedToUserIds.findIndex((id) => id === idToUnsubscribe);
      if (idx === -1) throw fastify.httpErrors.badRequest(RoutesErrors.userNotSubscribed);

      subscribedToUserIds.splice(idx, 1);

      return fastify.db.users.change(id, { subscribedToUserIds });
    }
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        body: changeUserBodySchema,
        params: idParamSchema,
      },
    },
    async function (request, reply): Promise<UserEntity> {
      const { id } = request.params;

      const found = await fastify.db.users.findOne({ key: 'id', equals: id });
      if (!found) throw fastify.httpErrors.badRequest(RoutesErrors.userNotFound);

      const { body } = request;
      return fastify.db.users.change(id, body);
    }
  );
};

export default plugin;
