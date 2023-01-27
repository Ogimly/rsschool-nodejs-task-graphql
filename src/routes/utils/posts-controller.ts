import { FastifyInstance } from 'fastify';
import { CreatePostDTO, ChangePostDTO } from '../../utils/DB/entities/DBPosts';
import { RoutesErrors } from './routes-errors';

export const findMany = (fastify: FastifyInstance) => fastify.db.posts.findMany();

export const findOne = async (fastify: FastifyInstance, id: string) => {
  const found = await fastify.db.posts.findOne({ key: 'id', equals: id });
  if (!found) throw fastify.httpErrors.notFound(RoutesErrors.postNotFound);

  return found;
};

export const create = async (fastify: FastifyInstance, body: CreatePostDTO) => {
  const userFound = await fastify.db.users.findOne({ key: 'id', equals: body.userId });
  if (!userFound) throw fastify.httpErrors.badRequest(RoutesErrors.userNotFound);

  return fastify.db.posts.create(body);
};

export const update = async (
  fastify: FastifyInstance,
  id: string,
  body: ChangePostDTO
) => {
  const found = await fastify.db.posts.findOne({ key: 'id', equals: id });
  if (!found) throw fastify.httpErrors.badRequest(RoutesErrors.postNotFound);

  return fastify.db.posts.change(id, body);
};

export const deleteOne = async (fastify: FastifyInstance, id: string) => {
  const found = await fastify.db.posts.findOne({ key: 'id', equals: id });
  if (!found) throw fastify.httpErrors.badRequest(RoutesErrors.postNotFound);

  return fastify.db.posts.delete(id);
};
