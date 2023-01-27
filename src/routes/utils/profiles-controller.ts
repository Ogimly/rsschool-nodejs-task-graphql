import { FastifyInstance } from 'fastify';
import { ChangeProfileDTO, CreateProfileDTO } from '../../utils/DB/entities/DBProfiles';
import { RoutesErrors } from './routes-errors';
import { ThrowError } from './throw-error';

export const findMany = (fastify: FastifyInstance) => fastify.db.profiles.findMany();

export const findOne = async (
  fastify: FastifyInstance,
  id: string,
  trowError = ThrowError.yes
) => {
  const found = await fastify.db.profiles.findOne({ key: 'id', equals: id });
  if (!found && trowError === ThrowError.yes)
    throw fastify.httpErrors.notFound(RoutesErrors.profileNotFound);

  return found;
};

export const findOneByUserId = async (
  fastify: FastifyInstance,
  userId: string,
  trowError = ThrowError.yes
) => {
  const found = await fastify.db.profiles.findOne({ key: 'userId', equals: userId });
  if (!found && trowError === ThrowError.yes)
    throw fastify.httpErrors.notFound(RoutesErrors.profileNotFound);

  return found;
};

export const create = async (
  fastify: FastifyInstance,
  body: CreateProfileDTO,
  trowError = ThrowError.yes
) => {
  const userFound = await fastify.db.users.findOne({ key: 'id', equals: body.userId });
  if (!userFound && trowError === ThrowError.yes)
    throw fastify.httpErrors.badRequest(RoutesErrors.userNotFound);

  const memberTypeFound = await fastify.db.memberTypes.findOne({
    key: 'id',
    equals: body.memberTypeId,
  });
  if (!memberTypeFound && trowError === ThrowError.yes)
    throw fastify.httpErrors.badRequest(RoutesErrors.memberTypeNotFound);

  const found = await fastify.db.profiles.findOne({ key: 'userId', equals: body.userId });
  if (found && trowError === ThrowError.yes)
    throw fastify.httpErrors.badRequest(RoutesErrors.userHasProfile);

  return fastify.db.profiles.create(body);
};

export const update = async (
  fastify: FastifyInstance,
  id: string,
  body: ChangeProfileDTO,
  trowError = ThrowError.yes
) => {
  const found = await fastify.db.profiles.findOne({ key: 'id', equals: id });
  if (!found && trowError === ThrowError.yes)
    throw fastify.httpErrors.badRequest(RoutesErrors.profileNotFound);

  return fastify.db.profiles.change(id, body);
};

export const deleteOne = async (
  fastify: FastifyInstance,
  id: string,
  trowError = ThrowError.yes
) => {
  const found = await fastify.db.profiles.findOne({ key: 'id', equals: id });
  if (!found && trowError === ThrowError.yes)
    throw fastify.httpErrors.badRequest(RoutesErrors.profileNotFound);

  return fastify.db.profiles.delete(id);
};
