import { GraphQLObjectType, GraphQLString } from 'graphql';

export const postType = new GraphQLObjectType({
  name: 'postType',
  description: 'Users post entity',
  fields: () => ({
    id: { type: GraphQLString, description: 'Unique id (uuid), generated automatically' },
    userId: { type: GraphQLString, description: 'Id of the User' },
    title: { type: GraphQLString, description: 'Title of the Users post' },
    content: { type: GraphQLString, description: 'Content of the Users post' },
  }),
});
