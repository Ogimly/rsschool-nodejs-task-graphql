import {
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { stringType, uuidType } from '../reused';

export const userType = new GraphQLObjectType({
  name: 'userType',
  description: 'User entity',
  fields: () => ({
    id: uuidType,
    firstName: stringType,
    lastName: stringType,
    email: stringType,
    subscribedToUserIds: {
      type: new GraphQLList(GraphQLString),
    },
  }),
});

export const userCreateType = {
  type: new GraphQLInputObjectType({
    name: 'userCreateType',
    fields: () => ({
      firstName: stringType,
      lastName: stringType,
      email: stringType,
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
      subscribedToUserIds: {
        type: new GraphQLList(GraphQLString),
      },
    }),
  }),
};
