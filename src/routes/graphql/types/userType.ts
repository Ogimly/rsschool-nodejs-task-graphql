import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';

export const userType = new GraphQLObjectType({
  name: 'userType',
  description: 'User entity',
  fields: () => ({
    id: { type: GraphQLString, description: 'Unique id (uuid), generated automatically' },
    firstName: { type: GraphQLString, description: 'First name of the User' },
    lastName: { type: GraphQLString, description: 'Last name of the User' },
    email: { type: GraphQLString, description: 'E-mail of the User' },
    subscribedToUserIds: {
      type: new GraphQLList(GraphQLString),
      description: 'Array of users ids, that have followed the User',
    },
  }),
});
