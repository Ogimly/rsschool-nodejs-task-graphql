import { FastifyInstance } from 'fastify';
import { CreateUserDTO, ChangeUserDTO } from '../../utils/DB/entities/DBUsers';
import { RoutesErrors } from './routes-errors';
import { ThrowError } from './throw-error';

export const findMany = (fastify: FastifyInstance) => fastify.db.users.findMany();

export const findOne = async (fastify: FastifyInstance, id: string) => {
  const found = await fastify.db.users.findOne({ key: 'id', equals: id });
  if (!found) throw fastify.httpErrors.notFound(RoutesErrors.userNotFound);

  return found;
};

export const findUserSubscribedTo = async (
  fastify: FastifyInstance,
  id: string,
  trowError = ThrowError.yes
) => {
  const found = await fastify.db.users.findOne({ key: 'id', equals: id });
  if (!found && trowError === ThrowError.yes)
    throw fastify.httpErrors.notFound(RoutesErrors.userNotFound);

  return found
    ? fastify.db.users.findMany({
        key: 'id',
        equalsAnyOf: found.subscribedToUserIds,
      })
    : [];
};

export const findSubscribedToUser = async (
  fastify: FastifyInstance,
  id: string,
  trowError = ThrowError.yes
) => {
  const found = await fastify.db.users.findOne({ key: 'id', equals: id });
  if (!found && trowError === ThrowError.yes)
    throw fastify.httpErrors.notFound(RoutesErrors.userNotFound);

  return found
    ? fastify.db.users.findMany({
        key: 'subscribedToUserIds',
        inArray: id,
      })
    : [];
};

export const create = (fastify: FastifyInstance, body: CreateUserDTO) =>
  fastify.db.users.create(body);

export const update = async (
  fastify: FastifyInstance,
  id: string,
  body: ChangeUserDTO
) => {
  const found = await fastify.db.users.findOne({ key: 'id', equals: id });
  if (!found) throw fastify.httpErrors.badRequest(RoutesErrors.userNotFound);

  return fastify.db.users.change(id, body);
};

export const subscribe = async (
  fastify: FastifyInstance,
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
  fastify: FastifyInstance,
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

export const deleteOne = async (fastify: FastifyInstance, id: string) => {
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
