import { ChangeMemberTypeDTO } from '../../utils/DB/entities/DBMemberTypes';
import { FastifyType } from '../graphql/types/fastify';
import { RoutesErrors } from './routes-errors';

export const findMany = (fastify: FastifyType) => fastify.db.memberTypes.findMany();

export const findOne = async (fastify: FastifyType, id: string) => {
  const found = await fastify.db.memberTypes.findOne({ key: 'id', equals: id });
  if (!found) throw fastify.httpErrors.notFound(RoutesErrors.memberTypeNotFound);

  return found;
};

export const update = async (
  fastify: FastifyType,
  id: string,
  body: ChangeMemberTypeDTO
) => {
  const found = await fastify.db.memberTypes.findOne({ key: 'id', equals: id });
  if (!found) throw fastify.httpErrors.badRequest(RoutesErrors.memberTypeNotFound);

  return fastify.db.memberTypes.change(id, body);
};
