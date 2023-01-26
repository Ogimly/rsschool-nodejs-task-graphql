import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

export const profileType = new GraphQLObjectType({
  name: 'profileType',
  description: 'Users profile entity',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Unique id (uuid), generated automatically',
    },
    userId: { type: new GraphQLNonNull(GraphQLID), description: 'Id of the User' },
    memberTypeId: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Id of memberType of the User',
    },
    avatar: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Avatar of the User',
    },
    sex: { type: new GraphQLNonNull(GraphQLString), description: 'Sex of the User' },
    birthday: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Birth day of the User',
    },
    country: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Country of the Users address',
    },
    street: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Street of the Users address',
    },
    city: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'City of the Users address',
    },
  }),
});

export const profileCreateType = new GraphQLInputObjectType({
  name: 'profileCreateType',
  fields: () => ({
    userId: { type: new GraphQLNonNull(GraphQLID), description: 'Id of the User' },
    memberTypeId: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Id of memberType of the User',
    },
    avatar: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Avatar of the User',
    },
    sex: { type: new GraphQLNonNull(GraphQLString), description: 'Sex of the User' },
    birthday: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Birth day of the User',
    },
    country: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Country of the Users address',
    },
    street: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Street of the Users address',
    },
    city: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'City of the Users address',
    },
  }),
});
