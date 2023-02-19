import { User } from '@prisma/client';
import { Expose } from 'class-transformer';

export class UserResponseDto implements Partial<User> {
  @Expose()
  id: number;

  @Expose()
  email: string;
}
