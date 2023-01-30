import { GraphQLInputObjectType, GraphQLInt, GraphQLObjectType } from 'graphql';
import { numberType, uuidType } from '../reused';

export const memberTypeType = new GraphQLObjectType({
  name: 'memberTypeType',
  description: 'Member type',
  fields: () => ({
    id: uuidType,
    discount: numberType,
    monthPostsLimit: numberType,
  }),
});

export const memberTypeUpdateType = {
  type: new GraphQLInputObjectType({
    name: 'memberTypeUpdateType',
    fields: () => ({
      discount: { type: GraphQLInt },
      monthPostsLimit: { type: GraphQLInt },
    }),
  }),
};
