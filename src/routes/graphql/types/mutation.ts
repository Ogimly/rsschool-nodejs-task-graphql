import { stringType, uuidType } from './reused';
import { memberTypeType, memberTypeUpdateType } from './db/member-type';
import { postCreateType, postType, postUpdateType } from './db/post';
import { profileCreateType, profileType, profileUpdateType } from './db/profile';
import { userCreateType, userType, userUpdateType } from './db/user';
import * as usersController from '../../utils/users-controller';
import * as profilesController from '../../utils/profiles-controller';
import * as postsController from '../../utils/posts-controller';
import * as memberTypeController from '../../utils/member-type-controller';
import { GraphQLObjectType } from 'graphql';
import { ContextType } from '../index.d';

export const MutationType = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: () => ({
    createUser: {
      type: userType,
      args: {
        createUserDTO: userCreateType,
      },
      resolve: (_: unknown, { createUserDTO }: any, { fastify }: ContextType) =>
        usersController.create(fastify, createUserDTO),
    },

    createProfile: {
      type: profileType,
      args: {
        createProfileDTO: profileCreateType,
      },
      resolve: (_: unknown, { createProfileDTO }: any, { fastify }: ContextType) =>
        profilesController.create(fastify, createProfileDTO),
    },

    createPost: {
      type: postType,
      args: {
        createPostDTO: postCreateType,
      },
      resolve: (_: unknown, { createPostDTO }: any, { fastify }: ContextType) =>
        postsController.create(fastify, createPostDTO),
    },

    updateUser: {
      type: userType,
      args: {
        id: uuidType,
        updateUserDTO: userUpdateType,
      },
      resolve: (_: unknown, { id, updateUserDTO }: any, { fastify }: ContextType) =>
        usersController.update(fastify, id, updateUserDTO),
    },

    updateProfile: {
      type: profileType,
      args: {
        id: uuidType,
        updateProfileDTO: profileUpdateType,
      },
      resolve: (_: unknown, { id, updateProfileDTO }: any, { fastify }: ContextType) =>
        profilesController.update(fastify, id, updateProfileDTO),
    },

    updatePost: {
      type: postType,
      args: {
        id: uuidType,
        updatePostDTO: postUpdateType,
      },
      resolve: (_: unknown, { id, updatePostDTO }: any, { fastify }: ContextType) =>
        postsController.update(fastify, id, updatePostDTO),
    },

    updateMemberType: {
      type: memberTypeType,
      args: {
        id: stringType,
        updateMemberTypeDTO: memberTypeUpdateType,
      },
      resolve: (_: unknown, { id, updateMemberTypeDTO }: any, { fastify }: ContextType) =>
        memberTypeController.update(fastify, id, updateMemberTypeDTO),
    },

    subscribeTo: {
      type: userType,
      args: {
        id: uuidType,
        idForSubscribe: uuidType,
      },
      resolve: (_: unknown, { id, idForSubscribe }: any, { fastify }: ContextType) =>
        usersController.subscribe(fastify, id, idForSubscribe),
    },

    unsubscribeFrom: {
      type: userType,
      args: {
        id: uuidType,
        idForUnsubscribe: uuidType,
      },
      resolve: (_: unknown, { id, idForUnsubscribe }: any, { fastify }: ContextType) =>
        usersController.unsubscribe(fastify, id, idForUnsubscribe),
    },
  }),
});
