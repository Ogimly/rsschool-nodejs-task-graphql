import { GraphQLInputObjectType, GraphQLObjectType, GraphQLString } from 'graphql';
import { stringType, uuidType } from '../reused';

export const postType = new GraphQLObjectType({
  name: 'postType',
  description: 'Users post entity',
  fields: () => ({
    id: uuidType,
    userId: uuidType,
    title: stringType,
    content: stringType,
  }),
});

export const postCreateType = {
  type: new GraphQLInputObjectType({
    name: 'postCreateType',
    fields: () => ({
      userId: uuidType,
      title: stringType,
      content: stringType,
    }),
  }),
};

export const postUpdateType = {
  type: new GraphQLInputObjectType({
    name: 'postUpdateType',
    fields: () => ({
      title: { type: GraphQLString },
      content: { type: GraphQLString },
    }),
  }),
};
