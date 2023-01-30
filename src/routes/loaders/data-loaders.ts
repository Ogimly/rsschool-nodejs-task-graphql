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

const batchGetUsers = async (ids: readonly string[], fastify: FastifyInstance) => {
  const users = await usersController.findMany(fastify);

  const usersMap: Record<string, UserEntity> = {};

  users.forEach((user: UserEntity) => {
    usersMap[user.id] = user;
  });

  return ids.map((id) => usersMap[id]);
};

const batchGetProfiles = async (ids: readonly string[], fastify: FastifyInstance) => {
  const profiles = await profilesController.findMany(fastify);

  const profilesMap: Record<string, ProfileEntity> = {};

  profiles.forEach((profile: ProfileEntity) => {
    profilesMap[profile.id] = profile;
  });

  return ids.map((id) => profilesMap[id]);
};

const batchGetMemberTypes = async (ids: readonly string[], fastify: FastifyInstance) => {
  const memberTypes = await memberTypeController.findMany(fastify);

  const memberTypesMap: Record<string, MemberTypeEntity> = {};

  memberTypes.forEach((memberType: MemberTypeEntity) => {
    memberTypesMap[memberType.id] = memberType;
  });

  return ids.map((id) => memberTypesMap[id]);
};

const batchGetPosts = async (ids: readonly string[], fastify: FastifyInstance) => {
  const posts = await postsController.findMany(fastify);

  const postsMap: Record<string, PostEntity> = {};

  posts.forEach((post: PostEntity) => {
    postsMap[post.id] = post;
  });

  return ids.map((id) => postsMap[id]);
};

const batchGetUserSubscribedTo = async (
  ids: readonly string[],
  fastify: FastifyInstance
) => {
  const users = await usersController.findMany(fastify);

  const userSubscribedToMap: Record<string, UserEntity[]> = {};

  users.forEach((userSubscribedTo: UserEntity) => {
    userSubscribedToMap[userSubscribedTo.id] = users.filter(({ subscribedToUserIds }) =>
      subscribedToUserIds.includes(userSubscribedTo.id)
    );
  });

  return ids.map((id) => userSubscribedToMap[id]);
};

const batchGetSubscribedToUser = async (
  ids: readonly string[],
  fastify: FastifyInstance
) => {
  const users = await usersController.findMany(fastify);

  const subscribedToUserMap: Record<string, UserEntity[]> = {};

  users.forEach((subscribedToUser: UserEntity) => {
    subscribedToUserMap[subscribedToUser.id] = users.filter(({ id }) =>
      subscribedToUser.subscribedToUserIds.includes(id)
    );
  });

  return ids.map((id) => subscribedToUserMap[id]);
};

export const createDataLoaders = (fastify: FastifyInstance): DataLoadersType => ({
  usersLoader: new DataLoader((ids: readonly string[]) => batchGetUsers(ids, fastify)),

  profilesLoader: new DataLoader((ids: readonly string[]) =>
    batchGetProfiles(ids, fastify)
  ),

  memberTypesLoader: new DataLoader((ids: readonly string[]) =>
    batchGetMemberTypes(ids, fastify)
  ),

  postsLoader: new DataLoader((ids: readonly string[]) => batchGetPosts(ids, fastify)),

  userSubscribedToLoader: new DataLoader((ids: readonly string[]) =>
    batchGetUserSubscribedTo(ids, fastify)
  ),

  subscribedToUserLoader: new DataLoader((ids: readonly string[]) =>
    batchGetSubscribedToUser(ids, fastify)
  ),
});
