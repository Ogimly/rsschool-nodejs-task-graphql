import { FastifyInstance } from 'fastify';
import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { UserEntity } from '../../../../utils/DB/entities/DBUsers';
import { profileType } from './profile';
import { userType } from './user';
import * as profilesController from '../../../utils/profiles-controller';
import * as memberTypeController from '../../../utils/member-type-controller';
import { ThrowError } from '../../../utils/throw-error';
import { memberTypeType } from './member-type';

export const userFullProfileType = new GraphQLObjectType({
  name: 'userFullProfileType',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    profile: { type: profileType },
    memberType: { type: memberTypeType },
  }),
});

export const userWithFullProfileType = new GraphQLObjectType({
  name: 'userWithFullProfileType',
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

    userFullProfile: {
      type: userFullProfileType,
      resolve: async (user: UserEntity, _: unknown, fastify: FastifyInstance) => {
        const profile = await profilesController.findOneByUserId(
          fastify,
          user.id,
          ThrowError.no
        );

        const memberType = profile
          ? await memberTypeController.findOne(
              fastify,
              profile.memberTypeId,
              ThrowError.no
            )
          : null;

        return { ...user, profile, memberType };
      },
    },
  }),
});
