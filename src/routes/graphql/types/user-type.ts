import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

export const userType = new GraphQLObjectType({
  name: 'userType',
  description: 'User entity',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Unique id (uuid), generated automatically',
    },
    firstName: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'First name of the User',
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Last name of the User',
    },
    email: { type: new GraphQLNonNull(GraphQLString), description: 'E-mail of the User' },
    subscribedToUserIds: {
      type: new GraphQLList(GraphQLString),
      description: 'Array of users ids, that have followed the User',
    },
  }),
});

export const userCreateType = {
  type: new GraphQLInputObjectType({
    name: 'userCreateType',
    fields: () => ({
      firstName: { type: new GraphQLNonNull(GraphQLString) },
      lastName: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
    }),
  }),
};

export const userUpdateType = {
  type: new GraphQLInputObjectType({
    name: 'userUpdateType',
    fields: () => ({
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      email: { type: GraphQLString },
    }),
  }),
};
