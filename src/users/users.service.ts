import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaErrors } from '../common/helpers/prisma-errors.helper';
import { LocalPrismaService } from '../local-prisma/local-prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: LocalPrismaService) {}

  /**
   * Finds a user by the where clause
   * @param where - The where clause to find the user with
   * @returns The user that was found
   */
  async findOne(where: Prisma.UserWhereUniqueInput): Promise<User> {
    const user = await this.prisma.user.findUnique({ where });
    if (!user) throw new NotFoundException('User is not found.');

    return user;
  }

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
