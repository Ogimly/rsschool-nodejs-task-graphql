import { CreatePostDTO, ChangePostDTO } from '../../utils/DB/entities/DBPosts';
import { FastifyType } from '../graphql/types/fastify';
import { RoutesErrors } from './routes-errors';

export const findMany = (fastify: FastifyType) => fastify.db.posts.findMany();

export const findOne = async (fastify: FastifyType, id: string) => {
  const found = await fastify.db.posts.findOne({ key: 'id', equals: id });
  if (!found) throw fastify.httpErrors.notFound(RoutesErrors.postNotFound);

  return found;
};

export const create = async (fastify: FastifyType, body: CreatePostDTO) => {
  const userFound = await fastify.db.users.findOne({ key: 'id', equals: body.userId });
  if (!userFound) throw fastify.httpErrors.badRequest(RoutesErrors.userNotFound);

  return fastify.db.posts.create(body);
};

export const update = async (fastify: FastifyType, id: string, body: ChangePostDTO) => {
  const found = await fastify.db.posts.findOne({ key: 'id', equals: id });
  if (!found) throw fastify.httpErrors.badRequest(RoutesErrors.postNotFound);

  return fastify.db.posts.change(id, body);
};

export const deleteOne = async (fastify: FastifyType, id: string) => {
  const found = await fastify.db.posts.findOne({ key: 'id', equals: id });
  if (!found) throw fastify.httpErrors.badRequest(RoutesErrors.postNotFound);

  return fastify.db.posts.delete(id);
};
