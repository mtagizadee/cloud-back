import { Body, Post, Res } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { DocumentedController } from '../common/decorators/documented-controller.decorator';
import { TCoockies } from './types/coockies.type';
import { MessageResponse } from 'src/common/types/message.type';
import { AuthService } from './services/auth.service';
import {
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from '@prisma/client';
import { Response } from 'express';

@DocumentedController('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Logs in a user
   */
  @Post('login')
  @ApiNotFoundResponse({ description: 'User is not found' })
  @ApiForbiddenResponse({ description: "Password isn't valid" })
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<User> {
    const { user, tokens } = await this.authService.login(loginUserDto);

    response.cookie('refresh_token' as keyof TCoockies, tokens.refreshToken);
    response.setHeader('Authorization', 'Bearer ' + tokens.accessToken);

    return user;
  }

  /**
   * Signs up a user
   */
  @Post('signup')
  @ApiConflictResponse({ description: 'User already exists' })
  signup(@Body() createUserDto: CreateUserDto): Promise<MessageResponse> {
    return this.authService.singup(createUserDto);
  }
}
