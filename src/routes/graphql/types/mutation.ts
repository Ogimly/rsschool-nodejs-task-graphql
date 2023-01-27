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
import { GraphQLObjectType } from 'graphql';

export const MutationType = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: () => ({
    createUser: {
      type: userType,
      args: {
        createUserDTO: userCreateType,
      },
      resolve: (_: unknown, { createUserDTO }: any, fastify: FastifyInstance) =>
        usersController.create(fastify, createUserDTO),
    },

    createProfile: {
      type: profileType,
      args: {
        createProfileDTO: profileCreateType,
      },
      resolve: (_: unknown, { createProfileDTO }: any, fastify: FastifyInstance) =>
        profilesController.create(fastify, createProfileDTO),
    },

    createPost: {
      type: postType,
      args: {
        createPostDTO: postCreateType,
      },
      resolve: (_: unknown, { createPostDTO }: any, fastify: FastifyInstance) =>
        postsController.create(fastify, createPostDTO),
    },

    updateUser: {
      type: userType,
      args: {
        id: uuidType,
        updateUserDTO: userUpdateType,
      },
      resolve: (_: unknown, { id, updateUserDTO }: any, fastify: FastifyInstance) =>
        usersController.update(fastify, id, updateUserDTO),
    },

    updateProfile: {
      type: profileType,
      args: {
        id: uuidType,
        updateProfileDTO: profileUpdateType,
      },
      resolve: (_: unknown, { id, updateProfileDTO }: any, fastify: FastifyInstance) =>
        profilesController.update(fastify, id, updateProfileDTO),
    },

    updatePost: {
      type: postType,
      args: {
        id: uuidType,
        updatePostDTO: postUpdateType,
      },
      resolve: (_: unknown, { id, updatePostDTO }: any, fastify: FastifyInstance) =>
        postsController.update(fastify, id, updatePostDTO),
    },

    updateMemberType: {
      type: memberTypeType,
      args: {
        id: idType,
        updateMemberTypeDTO: memberTypeUpdateType,
      },
      resolve: (_: unknown, { id, updateMemberTypeDTO }: any, fastify: FastifyInstance) =>
        memberTypeController.update(fastify, id, updateMemberTypeDTO),
    },

    subscribeTo: {
      type: userType,
      args: {
        id: uuidType,
        idForSubscribe: uuidType,
      },
      resolve: (_: unknown, { id, idForSubscribe }: any, fastify: FastifyInstance) =>
        usersController.subscribe(fastify, id, idForSubscribe),
    },

    unsubscribeFrom: {
      type: userType,
      args: {
        id: uuidType,
        idForUnsubscribe: uuidType,
      },
      resolve: (_: unknown, { id, idForUnsubscribe }: any, fastify: FastifyInstance) =>
        usersController.unsubscribe(fastify, id, idForUnsubscribe),
    },
  }),
});
