import { GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLString } from 'graphql';
import { CreateProfileDTO } from '../../../utils/DB/entities/DBProfiles';
import { CreateUserDTO } from '../../../utils/DB/entities/DBUsers';
import { FastifyType } from './fastify-type';
// import { memberTypeType } from './member-type-type';
// import { postType } from './post-type';
import { profileType } from './profile-type';
import { userType } from './user-type';
import * as usersController from '../../utils/users-controller';
import * as profilesController from '../../utils/profiles-controller';

export const getMutationType = (fastify: FastifyType) => ({
  name: 'RootMutationType',
  fields: () => ({
    createUser: {
      type: userType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_: any, createUserDTO: CreateUserDTO) =>
        usersController.create(fastify, createUserDTO),
    },

    createProfile: {
      type: profileType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
        memberTypeId: { type: new GraphQLNonNull(GraphQLString) },
        avatar: { type: new GraphQLNonNull(GraphQLString) },
        sex: { type: new GraphQLNonNull(GraphQLString) },
        birthday: { type: new GraphQLNonNull(GraphQLInt) },
        country: { type: new GraphQLNonNull(GraphQLString) },
        street: { type: new GraphQLNonNull(GraphQLString) },
        city: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_: any, createProfileDTO: CreateProfileDTO) =>
        profilesController.create(fastify, createProfileDTO),
    },
  }),
});
