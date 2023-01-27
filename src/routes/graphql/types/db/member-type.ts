import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';

export const memberTypeType = new GraphQLObjectType({
  name: 'memberTypeType',
  description: 'Member type',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID), description: 'Unique id' },
    discount: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Discount of the Member type',
    },
    monthPostsLimit: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'limit on the number of posts per month of the Member type',
    },
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
