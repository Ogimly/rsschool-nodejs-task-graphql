import { FastifyInstance } from 'fastify';
import { ChangeMemberTypeDTO } from '../../utils/DB/entities/DBMemberTypes';
import { RoutesErrors } from './routes-errors';
import { ThrowError } from './throw-error';

export const findMany = (fastify: FastifyInstance) => fastify.db.memberTypes.findMany();

export const findManyByIds = (fastify: FastifyInstance, ids: string[]) =>
  fastify.db.memberTypes.findMany({ key: 'id', equalsAnyOf: ids });

export const findOne = async (
  fastify: FastifyInstance,
  id: string,
  trowError = ThrowError.yes
) => {
  const found = await fastify.db.memberTypes.findOne({ key: 'id', equals: id });
  if (!found && trowError === ThrowError.yes)
    throw fastify.httpErrors.notFound(RoutesErrors.memberTypeNotFound);

  return found;
};

export const update = async (
  fastify: FastifyInstance,
  id: string,
  body: ChangeMemberTypeDTO,
  trowError = ThrowError.yes
) => {
  const found = await fastify.db.memberTypes.findOne({ key: 'id', equals: id });
  if (!found && trowError === ThrowError.yes)
    throw fastify.httpErrors.badRequest(RoutesErrors.memberTypeNotFound);

  return fastify.db.memberTypes.change(id, body);
};
