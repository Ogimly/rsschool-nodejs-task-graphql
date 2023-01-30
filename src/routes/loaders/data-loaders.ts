import * as DataLoader from 'dataloader';
import { FastifyInstance } from 'fastify';
import { UserEntity } from '../../utils/DB/entities/DBUsers';
import { ProfileEntity } from '../../utils/DB/entities/DBProfiles';
import { MemberTypeEntity } from '../../utils/DB/entities/DBMemberTypes';
import { PostEntity } from '../../utils/DB/entities/DBPosts';
import * as usersController from '../utils/users-controller';
import * as profilesController from '../utils/profiles-controller';
import * as memberTypeController from '../utils/member-type-controller';
import * as postsController from '../utils/posts-controller';
import { DataLoadersType } from './data-loaders.d';

// [userId]: user
const batchGetUsers = async (
  ids: readonly string[],
  fastify: FastifyInstance,
  users: UserEntity[]
) => {
  // const users = await usersController.findMany(fastify);

  const usersMap: Record<string, UserEntity> = {};

  users.forEach((user: UserEntity) => {
    usersMap[user.id] = user;
  });

  return ids.map((id) => usersMap[id]);
};

// [userId]: profile
const batchGetProfiles = async (
  ids: readonly string[],
  fastify: FastifyInstance,
  users: UserEntity[]
) => {
  // const users = await usersController.findMany(fastify);
  const profiles = await profilesController.findMany(fastify);

  const profilesMap: Record<string, ProfileEntity | null> = {};

  users.forEach(({ id }: UserEntity) => {
    profilesMap[id] = profiles.find(({ userId }: ProfileEntity) => userId === id) || null;
  });

  return ids.map((id) => profilesMap[id]);
};

// [memberTypeId]: memberType
const batchGetMemberTypes = async (ids: readonly string[], fastify: FastifyInstance) => {
  const memberTypes = await memberTypeController.findMany(fastify);

  const memberTypesMap: Record<string, MemberTypeEntity> = {};

  memberTypes.forEach((memberType: MemberTypeEntity) => {
    memberTypesMap[memberType.id] = memberType;
  });

  return ids.map((id) => memberTypesMap[id]);
};

// [userId]: posts
const batchGetPosts = async (
  ids: readonly string[],
  fastify: FastifyInstance,
  users: UserEntity[]
) => {
  // const users = await usersController.findMany(fastify);
  const posts = await postsController.findMany(fastify);

  const postsMap: Record<string, PostEntity[]> = {};

  users.forEach(({ id }: UserEntity) => {
    postsMap[id] = posts.filter(({ userId }) => userId === id);
  });

  return ids.map((id) => postsMap[id]);
};

const batchGetUserSubscribedTo = async (
  ids: readonly string[],
  fastify: FastifyInstance,
  users: UserEntity[]
) => {
  // const users = await usersController.findMany(fastify);

  const userSubscribedToMap: Record<string, UserEntity[]> = {};

  users.forEach(({ id }: UserEntity) => {
    userSubscribedToMap[id] = users.filter(({ subscribedToUserIds }) =>
      subscribedToUserIds.includes(id)
    );
  });

  return ids.map((id) => userSubscribedToMap[id]);
};

const batchGetSubscribedToUser = async (
  ids: readonly string[],
  fastify: FastifyInstance,
  users: UserEntity[]
) => {
  // const users = await usersController.findMany(fastify);

  const subscribedToUserMap: Record<string, UserEntity[]> = {};

  users.forEach((subscribedToUser: UserEntity) => {
    subscribedToUserMap[subscribedToUser.id] = users.filter(({ id }) =>
      subscribedToUser.subscribedToUserIds.includes(id)
    );
  });

  return ids.map((id) => subscribedToUserMap[id]);
};

export const createDataLoaders = async (
  fastify: FastifyInstance
): Promise<DataLoadersType> => {
  const users = await usersController.findMany(fastify);

  return {
    usersLoader: new DataLoader((ids: readonly string[]) =>
      batchGetUsers(ids, fastify, users)
    ),

    profilesLoader: new DataLoader((ids: readonly string[]) =>
      batchGetProfiles(ids, fastify, users)
    ),

    memberTypesLoader: new DataLoader((ids: readonly string[]) =>
      batchGetMemberTypes(ids, fastify)
    ),

    postsLoader: new DataLoader((ids: readonly string[]) =>
      batchGetPosts(ids, fastify, users)
    ),

    userSubscribedToLoader: new DataLoader((ids: readonly string[]) =>
      batchGetUserSubscribedTo(ids, fastify, users)
    ),

    subscribedToUserLoader: new DataLoader((ids: readonly string[]) =>
      batchGetSubscribedToUser(ids, fastify, users)
    ),
  };
};
