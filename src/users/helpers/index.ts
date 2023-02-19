import { User } from '@prisma/client';

export const usersFactory = (user: User): User => {
  delete user.password;
  return user;
};
