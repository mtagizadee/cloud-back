import { Body, Post, Res, Get } from '@nestjs/common';
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
import { ResponseBody } from '../common/decorators/response-body.decorator';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { Auth } from './decorators/auth.decorator';

@DocumentedController('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Logs in a user
   */
  @Post('login')
  @ResponseBody(UserResponseDto)
  @ApiNotFoundResponse({ description: 'User is not found' })
  @ApiForbiddenResponse({ description: "Password isn't valid" })
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<User> {
    const { user, tokens } = await this.authService.login(loginUserDto);

    response.cookie('refresh_token' as keyof TCoockies, tokens.refreshToken);
    response.setHeader('Authorization', tokens.accessToken);

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

  /**
   * Gets the current user that is logged in
   */
  @Get('me')
  @ResponseBody(UserResponseDto)
  @Auth()
  me(@CurrentUser() user: User): User {
    return user;
  }
}
