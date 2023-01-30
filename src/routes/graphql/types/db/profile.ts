import {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { numberType, stringType, uuidType } from '../reused';

export const profileType = new GraphQLObjectType({
  name: 'profileType',
  description: 'Users profile entity',
  fields: () => ({
    id: uuidType,
    userId: uuidType,
    memberTypeId: stringType,
    avatar: stringType,
    sex: stringType,
    birthday: numberType,
    country: stringType,
    street: stringType,
    city: stringType,
  }),
});

export const profileCreateType = {
  type: new GraphQLInputObjectType({
    name: 'profileCreateType',
    fields: () => ({
      userId: uuidType,
      memberTypeId: stringType,
      avatar: stringType,
      sex: stringType,
      birthday: numberType,
      country: stringType,
      street: stringType,
      city: stringType,
    }),
  }),
};

export const profileUpdateType = {
  type: new GraphQLInputObjectType({
    name: 'profileUpdateType',
    fields: () => ({
      memberTypeId: { type: GraphQLString },
      avatar: { type: GraphQLString },
      sex: { type: GraphQLString },
      birthday: { type: GraphQLInt },
      country: { type: GraphQLString },
      street: { type: GraphQLString },
      city: { type: GraphQLString },
    }),
  }),
};
