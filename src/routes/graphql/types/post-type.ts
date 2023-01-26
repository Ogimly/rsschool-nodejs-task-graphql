import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

export const postType = new GraphQLObjectType({
  name: 'postType',
  description: 'Users post entity',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Unique id (uuid), generated automatically',
    },
    userId: { type: new GraphQLNonNull(GraphQLID), description: 'Id of the User' },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Title of the Users post',
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Content of the Users post',
    },
  }),
});

export const postCreateType = {
  type: new GraphQLInputObjectType({
    name: 'postCreateType',
    fields: () => ({
      userId: { type: new GraphQLNonNull(GraphQLID) },
      title: { type: new GraphQLNonNull(GraphQLString) },
      content: { type: new GraphQLNonNull(GraphQLString) },
    }),
  }),
};
