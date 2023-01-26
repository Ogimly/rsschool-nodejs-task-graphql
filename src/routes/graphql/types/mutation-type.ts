import { GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLString } from 'graphql';
import { CreateProfileDTO } from '../../../utils/DB/entities/DBProfiles';
import { CreateUserDTO } from '../../../utils/DB/entities/DBUsers';
import { RoutesErrors } from '../../utils/routes-errors';
import { FastifyType } from './fastify-type';
// import { memberTypeType } from './member-type-type';
// import { postType } from './post-type';
import { profileType } from './profile-type';
import { userType } from './user-type';
import * as usersController from '../../utils/users-controller';

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
      resolve: async (_: any, createProfileDTO: CreateProfileDTO) => {
        let id = createProfileDTO.memberTypeId;
        const memberTypeFound = await fastify.db.memberTypes.findOne({
          key: 'id',
          equals: id,
        });

        if (!memberTypeFound)
          throw fastify.httpErrors.badRequest(RoutesErrors.memberTypeNotFound);

        id = createProfileDTO.userId;
        const userFound = await fastify.db.users.findOne({ key: 'id', equals: id });

        if (!userFound) throw fastify.httpErrors.badRequest(RoutesErrors.userNotFound);

        const found = await fastify.db.profiles.findOne({
          key: 'userId',
          equals: id,
        });

        if (found) throw fastify.httpErrors.badRequest(RoutesErrors.userHasProfile);

        return fastify.db.profiles.create(createProfileDTO);
      },
    },
  }),
});
