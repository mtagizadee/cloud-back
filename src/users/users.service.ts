import { Injectable, ConflictException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaErrors } from '../common/helpers/prisma-errors.helper';
import { LocalPrismaService } from '../local-prisma/local-prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: LocalPrismaService) {}

  /**
   * Creates a new user
   * @param createUserDto - The user data to create a new user with
   * @returns The newly created user
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.prisma.user.create({
        data: createUserDto,
      });
    } catch (error) {
      if (PrismaErrors.isPrismaError(error)) {
        if (PrismaErrors.isUniqueConstraintError(error)) {
          throw new ConflictException('User already exists');
        }
      }
    }
  }
}
