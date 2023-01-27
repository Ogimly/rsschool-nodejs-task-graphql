import { FastifyInstance } from 'fastify';
import { GraphQLObjectType, GraphQLList } from 'graphql';
import { UserEntity } from '../../../../utils/DB/entities/DBUsers';
import { profileType } from './profile';
import { userType } from './user';
import * as profilesController from '../../../utils/profiles-controller';
import * as postsController from '../../../utils/posts-controller';
import * as memberTypeController from '../../../utils/member-type-controller';
import { postType } from './post';
import { memberTypeType } from './member-type';
import { ThrowError } from '../../../utils/throw-error';

export const userWithAllEntitiesType = new GraphQLObjectType({
  name: 'userWithAllEntitiesType',
  fields: () => ({
    user: {
      type: userType,
      resolve: async (user: UserEntity) => user,
    },
    profile: {
      type: profileType,
      resolve: async ({ id }: UserEntity, _: unknown, fastify: FastifyInstance) =>
        profilesController.findOneByUserId(fastify, id, ThrowError.no),
    },
    posts: {
      type: new GraphQLList(postType),
      resolve: async ({ id }: UserEntity, _: unknown, fastify: FastifyInstance) =>
        postsController.findManyByUserId(fastify, id),
    },
    memberType: {
      type: memberTypeType,
      resolve: async ({ id }: UserEntity, _: unknown, fastify: FastifyInstance) => {
        const found = await profilesController.findOneByUserId(
          fastify,
          id,
          ThrowError.no
        );
        if (found)
          return memberTypeController.findOne(fastify, found.memberTypeId, ThrowError.no);

        return null;
      },
    },
  }),
});
