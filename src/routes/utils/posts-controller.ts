import { FastifyInstance } from 'fastify';
import { CreatePostDTO, ChangePostDTO } from '../../utils/DB/entities/DBPosts';
import { RoutesErrors } from './routes-errors';
import { ThrowError } from './throw-error';

export const findMany = (fastify: FastifyInstance) => fastify.db.posts.findMany();

export const findManyByUserId = (fastify: FastifyInstance, userId: string) =>
  fastify.db.posts.findMany({ key: 'userId', equals: userId });

export const findOne = async (
  fastify: FastifyInstance,
  id: string,
  trowError = ThrowError.yes
) => {
  const found = await fastify.db.posts.findOne({ key: 'id', equals: id });
  if (!found && trowError === ThrowError.yes)
    throw fastify.httpErrors.notFound(RoutesErrors.postNotFound);

  return found;
};

export const create = async (
  fastify: FastifyInstance,
  body: CreatePostDTO,
  trowError = ThrowError.yes
) => {
  const userFound = await fastify.db.users.findOne({ key: 'id', equals: body.userId });
  if (!userFound && trowError === ThrowError.yes)
    throw fastify.httpErrors.badRequest(RoutesErrors.userNotFound);

  return fastify.db.posts.create(body);
};

export const update = async (
  fastify: FastifyInstance,
  id: string,
  body: ChangePostDTO,
  trowError = ThrowError.yes
) => {
  const found = await fastify.db.posts.findOne({ key: 'id', equals: id });
  if (!found && trowError === ThrowError.yes)
    throw fastify.httpErrors.badRequest(RoutesErrors.postNotFound);

  return fastify.db.posts.change(id, body);
};

export const deleteOne = async (
  fastify: FastifyInstance,
  id: string,
  trowError = ThrowError.yes
) => {
  const found = await fastify.db.posts.findOne({ key: 'id', equals: id });
  if (!found && trowError === ThrowError.yes)
    throw fastify.httpErrors.badRequest(RoutesErrors.postNotFound);

  return fastify.db.posts.delete(id);
};
