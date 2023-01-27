import { idType, uuidType } from './reused';
import { memberTypeType, memberTypeUpdateType } from './db/member-type';
import { postCreateType, postType, postUpdateType } from './db/post';
import { profileCreateType, profileType, profileUpdateType } from './db/profile';
import { userCreateType, userType, userUpdateType } from './db/user';
import * as usersController from '../../utils/users-controller';
import * as profilesController from '../../utils/profiles-controller';
import * as postsController from '../../utils/posts-controller';
import * as memberTypeController from '../../utils/member-type-controller';
import { FastifyInstance } from 'fastify';

export const getMutationType = (fastify: FastifyInstance) => ({
  name: 'RootMutationType',
  fields: () => ({
    createUser: {
      type: userType,
      args: {
        createUserDTO: userCreateType,
      },
      resolve: (_: any, { createUserDTO }: any) =>
        usersController.create(fastify, createUserDTO),
    },

    createProfile: {
      type: profileType,
      args: {
        createProfileDTO: profileCreateType,
      },
      resolve: (_: any, { createProfileDTO }: any) =>
        profilesController.create(fastify, createProfileDTO),
    },

    createPost: {
      type: postType,
      args: {
        createPostDTO: postCreateType,
      },
      resolve: (_: any, { createPostDTO }: any) =>
        postsController.create(fastify, createPostDTO),
    },

    updateUser: {
      type: userType,
      args: {
        id: uuidType,
        updateUserDTO: userUpdateType,
      },
      resolve: (_: any, { id, updateUserDTO }: any) =>
        usersController.update(fastify, id, updateUserDTO),
    },

    updateProfile: {
      type: profileType,
      args: {
        id: uuidType,
        updateProfileDTO: profileUpdateType,
      },
      resolve: (_: any, { id, updateProfileDTO }: any) =>
        profilesController.update(fastify, id, updateProfileDTO),
    },

    updatePost: {
      type: postType,
      args: {
        id: uuidType,
        updatePostDTO: postUpdateType,
      },
      resolve: (_: any, { id, updatePostDTO }: any) =>
        postsController.update(fastify, id, updatePostDTO),
    },

    updateMemberType: {
      type: memberTypeType,
      args: {
        id: idType,
        updateMemberTypeDTO: memberTypeUpdateType,
      },
      resolve: (_: any, { id, updateMemberTypeDTO }: any) =>
        memberTypeController.update(fastify, id, updateMemberTypeDTO),
    },

    subscribeTo: {
      type: userType,
      args: {
        id: uuidType,
        idForSubscribe: uuidType,
      },
      resolve: (_: any, { id, idForSubscribe }: any) =>
        usersController.subscribe(fastify, id, idForSubscribe),
    },

    unsubscribeFrom: {
      type: userType,
      args: {
        id: uuidType,
        idForUnsubscribe: uuidType,
      },
      resolve: (_: any, { id, idForUnsubscribe }: any) =>
        usersController.unsubscribe(fastify, id, idForUnsubscribe),
    },
  }),
});
