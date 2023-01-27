import { FastifyInstance } from 'fastify';
import { ChangeMemberTypeDTO } from '../../utils/DB/entities/DBMemberTypes';
import { RoutesErrors } from './routes-errors';

export const findMany = (fastify: FastifyInstance) => fastify.db.memberTypes.findMany();

export const findOne = async (fastify: FastifyInstance, id: string) => {
  const found = await fastify.db.memberTypes.findOne({ key: 'id', equals: id });
  if (!found) throw fastify.httpErrors.notFound(RoutesErrors.memberTypeNotFound);

  return found;
};

export const update = async (
  fastify: FastifyInstance,
  id: string,
  body: ChangeMemberTypeDTO
) => {
  const found = await fastify.db.memberTypes.findOne({ key: 'id', equals: id });
  if (!found) throw fastify.httpErrors.badRequest(RoutesErrors.memberTypeNotFound);

  return fastify.db.memberTypes.change(id, body);
};
