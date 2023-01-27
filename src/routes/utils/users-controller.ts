import { CreateUserDTO, ChangeUserDTO } from '../../utils/DB/entities/DBUsers';
import { FastifyType } from '../graphql/types/fastify';
import { RoutesErrors } from './routes-errors';

export const findMany = (fastify: FastifyType) => fastify.db.users.findMany();

export const findOne = async (fastify: FastifyType, id: string) => {
  const found = await fastify.db.users.findOne({ key: 'id', equals: id });
  if (!found) throw fastify.httpErrors.notFound(RoutesErrors.userNotFound);

  return found;
};

export const create = (fastify: FastifyType, body: CreateUserDTO) =>
  fastify.db.users.create(body);

export const update = async (fastify: FastifyType, id: string, body: ChangeUserDTO) => {
  const found = await fastify.db.users.findOne({ key: 'id', equals: id });
  if (!found) throw fastify.httpErrors.badRequest(RoutesErrors.userNotFound);

  return fastify.db.users.change(id, body);
};

export const subscribe = async (
  fastify: FastifyType,
  userId: string,
  idToSubscribe: string
) => {
  const found = await fastify.db.users.findOne({ key: 'id', equals: userId });
  if (!found) throw fastify.httpErrors.badRequest(RoutesErrors.userNotFound);

  const { subscribedToUserIds } = found;

  if (!subscribedToUserIds.includes(idToSubscribe))
    subscribedToUserIds.push(idToSubscribe);

  return fastify.db.users.change(userId, { subscribedToUserIds });
};

export const unsubscribe = async (
  fastify: FastifyType,
  userId: string,
  idToUnsubscribe: string
) => {
  const found = await fastify.db.users.findOne({ key: 'id', equals: userId });
  if (!found) throw fastify.httpErrors.badRequest(RoutesErrors.userNotFound);

  const { subscribedToUserIds } = found;

  const idx = subscribedToUserIds.findIndex((id) => id === idToUnsubscribe);
  if (idx === -1) throw fastify.httpErrors.badRequest(RoutesErrors.userNotSubscribed);

  subscribedToUserIds.splice(idx, 1);

  return fastify.db.users.change(userId, { subscribedToUserIds });
};

export const deleteOne = async (fastify: FastifyType, id: string) => {
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
  if (foundPosts) Promise.all(foundPosts.map(({ id }) => fastify.db.posts.delete(id)));

  // del all subscribes
  const foundSubscribes = await fastify.db.users.findMany({
    key: 'subscribedToUserIds',
    inArray: id,
  });

  if (foundSubscribes)
    Promise.all(
      foundSubscribes.map(({ id: userId, subscribedToUserIds }) => {
        const idx = subscribedToUserIds.findIndex((userId) => userId === id);
        subscribedToUserIds.splice(idx, 1);

        return fastify.db.users.change(userId, { subscribedToUserIds });
      })
    );

  return fastify.db.users.delete(id);
};
