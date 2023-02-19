import { Injectable } from '@nestjs/common';
import { TMessage } from '../../common/types/message.type';
import { LocalPrismaService } from '../../local-prisma/local-prisma.service';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { hash } from 'argon2';
import { UsersService } from '../../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: LocalPrismaService,
    private readonly usersService: UsersService
  ) {}

  /**
   * Sings the user up to the server
   * @param createUserDto - The user data to create a new user with
   * @returns The message that the user was signed up
   */
  async singup(createUserDto: CreateUserDto): Promise<TMessage> {
    try {
      const hashedPassword = await hash(createUserDto.password);

      await this.usersService.create({
        ...createUserDto,
        password: hashedPassword,
      });

      return { message: 'User successfully signed up.' };
    } catch (error) {
      throw error;
    }
  }
}
