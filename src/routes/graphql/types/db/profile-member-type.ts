import { FastifyInstance } from 'fastify';
import {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { ProfileEntity } from '../../../../utils/DB/entities/DBProfiles';
import * as memberTypeController from '../../../utils/member-type-controller';
import { ThrowError } from '../../../utils/throw-error';
import { memberTypeType } from './member-type';

export const profileWithMemberTypeType = new GraphQLObjectType({
  name: 'profileWithMemberTypeType',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    userId: { type: new GraphQLNonNull(GraphQLID) },
    memberTypeId: { type: new GraphQLNonNull(GraphQLString) },
    memberType: {
      type: new GraphQLNonNull(memberTypeType),
      resolve: async (
        { memberTypeId }: ProfileEntity,
        _: unknown,
        fastify: FastifyInstance
      ) => memberTypeController.findOne(fastify, memberTypeId, ThrowError.no),
    },
    avatar: { type: new GraphQLNonNull(GraphQLString) },
    sex: { type: new GraphQLNonNull(GraphQLString) },
    birthday: { type: new GraphQLNonNull(GraphQLInt) },
    country: { type: new GraphQLNonNull(GraphQLString) },
    street: { type: new GraphQLNonNull(GraphQLString) },
    city: { type: new GraphQLNonNull(GraphQLString) },
  }),
});
