import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';

export const memberTypeType = new GraphQLObjectType({
  name: 'memberTypeType',
  description: 'Member type',
  fields: () => ({
    id: { type: GraphQLString, description: 'Unique id' },
    discount: { type: GraphQLInt, description: 'Discount of the Member type' },
    monthPostsLimit: {
      type: GraphQLInt,
      description: 'limit on the number of posts per month of the Member type',
    },
  }),
});
