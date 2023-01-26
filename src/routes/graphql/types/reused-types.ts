import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';

export const idType = { type: new GraphQLNonNull(GraphQLString) };
export const uuidType = { type: new GraphQLNonNull(GraphQLID) };
