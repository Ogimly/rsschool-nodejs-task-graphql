import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { ProfileEntity } from '../../../../utils/DB/entities/DBProfiles';
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
        { memberTypesLoaderById }: ContextType
      ) => memberTypesLoaderById.load(memberTypeId),
    },
    avatar: stringType,
    sex: stringType,
    birthday: numberType,
    country: stringType,
    street: stringType,
    city: stringType,
  }),
});
