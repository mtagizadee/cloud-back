import { Injectable, ForbiddenException } from '@nestjs/common';
import { MessageResponse } from '../../common/types/message.type';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { hash, verify } from 'argon2';
import { UsersService } from '../../users/users.service';
import { LoginUserDto } from '../dto/login-user.dto';
import { User } from '@prisma/client';
import { LocalJwtService } from './local-jwt.service';
import { TJwtPair } from '../types/jwt.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly localJwt: LocalJwtService
  ) {}

  /**
   * Logs the user in to the server
   * @param loginUserDto - The user data to login with
   * @returns The user that was logged in
   */
  async login(
    loginUserDto: LoginUserDto
  ): Promise<{ user: User; tokens: TJwtPair }> {
    try {
      const user = await this.usersService.findOne({
        email: loginUserDto.email,
      });

      const isPasswordValid = await verify(
        user.password,
        loginUserDto.password
      );
      if (!isPasswordValid)
        throw new ForbiddenException("Password isn't valid");

      const tokens = this.localJwt.generatePair({ id: user.id });
      return { user, tokens };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Sings the user up to the server
   * @param createUserDto - The user data to create a new user with
   * @returns The message that the user was signed up
   */
  async singup(createUserDto: CreateUserDto): Promise<MessageResponse> {
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
