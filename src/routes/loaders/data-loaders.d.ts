import * as DataLoader from 'dataloader';
import { MemberTypeEntity } from '../utils/DB/entities/DBMemberTypes';
import { PostEntity } from '../utils/DB/entities/DBPosts';
import { ProfileEntity } from '../utils/DB/entities/DBProfiles';
import { UserEntity } from '../utils/DB/entities/DBUsers';

export type DataLoadersType = {
  profilesLoader: DataLoader<string, ProfileEntity, string>;

  memberTypesLoaderById: DataLoader<string, MemberTypeEntity, string>;

  memberTypesLoader: DataLoader<string, MemberTypeEntity, string>;

  postsLoader: DataLoader<string, PostEntity, string>;

  userSubscribedToLoader: DataLoader<string, UserEntity[], string>;

  subscribedToUserLoader: DataLoader<string, UserEntity[], string>;
};
