import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { ProfileEntity } from '../../../../utils/DB/entities/DBProfiles';
import * as memberTypeController from '../../../utils/member-type-controller';
import { ThrowError } from '../../../utils/throw-error';
import { numberType, stringType, uuidType } from '../reused';
import { memberTypeType } from './member-type';
import { ContextType } from '../../index.d';

export const profileWithMemberTypeType = new GraphQLObjectType({
  name: 'profileWithMemberTypeType',
  fields: () => ({
    id: uuidType,
    userId: uuidType,
    memberTypeId: stringType,
    memberType: {
      type: new GraphQLNonNull(memberTypeType),
      resolve: async (
        { memberTypeId }: ProfileEntity,
        _: unknown,
        { fastify }: ContextType
      ) => memberTypeController.findOne(fastify, memberTypeId, ThrowError.no),
    },
    avatar: stringType,
    sex: stringType,
    birthday: numberType,
    country: stringType,
    street: stringType,
    city: stringType,
  }),
});
