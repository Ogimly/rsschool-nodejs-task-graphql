import { GraphQLNonNull, GraphQLString } from 'graphql';

export const idType = { type: new GraphQLNonNull(GraphQLString) };
