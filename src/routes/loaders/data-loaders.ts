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

// [userId]: profile
const batchGetProfiles = async (ids: readonly string[], fastify: FastifyInstance) => {
  const profiles = await profilesController.findManyByUserIds(fastify, ids as string[]);

  const profilesMap: Record<string, ProfileEntity | null> = {};

  ids.forEach((id: string) => {
    profilesMap[id] = profiles.find(({ userId }: ProfileEntity) => userId === id) || null;
  });

  return ids.map((id) => profilesMap[id]);
};

// [memberTypeId]: memberType
const batchGetMemberTypesById = async (
  ids: readonly string[],
  fastify: FastifyInstance
) => {
  const memberTypes = await memberTypeController.findManyByIds(fastify, ids as string[]);

  const memberTypesMap: Record<string, MemberTypeEntity | null> = {};

  ids.forEach((id: string) => {
    memberTypesMap[id] =
      memberTypes.find((memberType: MemberTypeEntity) => memberType.id === id) || null;
  });

  return ids.map((id) => memberTypesMap[id]);
};

// [userId]: memberType
const batchGetMemberTypes = async (ids: readonly string[], fastify: FastifyInstance) => {
  const profiles = await profilesController.findManyByUserIds(fastify, ids as string[]);
  const memberTypes = await memberTypeController.findMany(fastify);

  const memberTypesMap: Record<string, MemberTypeEntity | null> = {};

  ids.forEach((id: string) => {
    const profile = profiles.find(({ userId }: ProfileEntity) => userId === id);
    memberTypesMap[id] = profile
      ? memberTypes.find(
          (memberType: MemberTypeEntity) => memberType.id === profile.memberTypeId
        ) || null
      : null;
  });

  return ids.map((id) => memberTypesMap[id]);
};

// [userId]: post[]
const batchGetPosts = async (ids: readonly string[], fastify: FastifyInstance) => {
  const posts = await postsController.findManyByUserIds(fastify, ids as string[]);

  const postsMap: Record<string, PostEntity[]> = {};

  ids.forEach((id: string) => {
    postsMap[id] = posts.filter(({ userId }) => userId === id);
  });

  return ids.map((id) => postsMap[id]);
};

// [userId]: UserSubscribedTo[]
const batchGetUserSubscribedTo = async (
  ids: readonly string[],
  fastify: FastifyInstance
) => {
  const users = await usersController.findMany(fastify);

  const userSubscribedToMap: Record<string, UserEntity[]> = {};

  ids.forEach((id: string) => {
    userSubscribedToMap[id] = users.filter(({ subscribedToUserIds }) =>
      subscribedToUserIds.includes(id)
    );
  });

  return ids.map((id) => userSubscribedToMap[id]);
};

// [userId]: subscribedToUser[]
const batchGetSubscribedToUser = async (
  ids: readonly string[],
  fastify: FastifyInstance
) => {
  const users = await usersController.findMany(fastify);

  const subscribedToUserMap: Record<string, UserEntity[]> = {};

  ids.forEach((id: string) => {
    const subscribedToUser = users.find((user: UserEntity) => user.id === id);
    if (subscribedToUser)
      subscribedToUserMap[subscribedToUser.id] = users.filter(({ id }) =>
        subscribedToUser.subscribedToUserIds.includes(id)
      );
  });

  return ids.map((id) => subscribedToUserMap[id] || []);
};

export const createDataLoaders = async (
  fastify: FastifyInstance
): Promise<DataLoadersType> => ({
  profilesLoader: new DataLoader((ids: readonly string[]) =>
    batchGetProfiles(ids, fastify)
  ),

  memberTypesLoaderById: new DataLoader((ids: readonly string[]) =>
    batchGetMemberTypesById(ids, fastify)
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
