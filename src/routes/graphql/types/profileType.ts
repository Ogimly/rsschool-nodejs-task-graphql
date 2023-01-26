import { GraphQLObjectType, GraphQLString } from 'graphql';

export const profileType = new GraphQLObjectType({
  name: 'profileType',
  description: 'Users profile entity',
  fields: () => ({
    id: { type: GraphQLString, description: 'Unique id (uuid), generated automatically' },
    userId: { type: GraphQLString, description: 'Id of the User' },
    memberTypeId: { type: GraphQLString, description: 'Id of memberType of the User' },
    avatar: { type: GraphQLString, description: 'Avatar of the User' },
    sex: { type: GraphQLString, description: 'Sex of the User' },
    birthday: { type: GraphQLString, description: 'Birth day of the User' },
    country: { type: GraphQLString, description: 'Country of the Users address' },
    street: { type: GraphQLString, description: 'Street of the Users address' },
    city: { type: GraphQLString, description: 'City of the Users address' },
  }),
});
