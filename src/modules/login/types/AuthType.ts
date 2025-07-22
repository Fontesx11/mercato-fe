import type { UserType } from './UserType';

export interface AuthType {
  accessToken: string;
  user: UserType;
}
