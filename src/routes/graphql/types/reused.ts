import { GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLString } from 'graphql';

export const numberType = { type: new GraphQLNonNull(GraphQLInt) };
export const stringType = { type: new GraphQLNonNull(GraphQLString) };
export const uuidType = { type: new GraphQLNonNull(GraphQLID) };
