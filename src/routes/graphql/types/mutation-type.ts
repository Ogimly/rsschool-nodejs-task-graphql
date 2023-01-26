import { FastifyType } from './fastify-type';
// import { memberTypeType } from './member-type-type';
import { postCreateType, postType } from './post-type';
import { profileCreateType, profileType } from './profile-type';
import { userCreateType, userType, userUpdateType } from './user-type';
import * as usersController from '../../utils/users-controller';
import * as profilesController from '../../utils/profiles-controller';
import * as postsController from '../../utils/posts-controller';
import { idType } from './reused-types';

export const getMutationType = (fastify: FastifyType) => ({
  name: 'RootMutationType',
  fields: () => ({
    createUser: {
      type: userType,
      args: {
        createUserDTO: { type: userCreateType },
      },
      resolve: (_: any, { createUserDTO }: any) =>
        usersController.create(fastify, createUserDTO),
    },

    createProfile: {
      type: profileType,
      args: {
        createProfileDTO: { type: profileCreateType },
      },
      resolve: (_: any, { createProfileDTO }: any) =>
        profilesController.create(fastify, createProfileDTO),
    },

    createPost: {
      type: postType,
      args: {
        createPostDTO: { type: postCreateType },
      },
      resolve: (_: any, { createPostDTO }: any) =>
        postsController.create(fastify, createPostDTO),
    },

    updateUser: {
      type: userType,
      args: {
        id: idType,
        updateUserDTO: userUpdateType,
      },
      resolve: (_: any, { id, updateUserDTO }: any) =>
        usersController.update(fastify, id, updateUserDTO),
    },
  }),
});
