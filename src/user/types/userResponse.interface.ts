import { UserEntity } from '../user.entity';

export interface UserResponseInterface {
  user: Omit<UserEntity, 'password' | 'id' | 'hashPassword'> & {
    token: string;
  };
}
