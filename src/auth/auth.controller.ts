import { Body, Post, HttpStatus, Res } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { DocumentedController } from '../common/decorators/documented-controller.decorator';
import { Cookies } from './decorators/coockies.decorator';
import { TCoockies } from './types/coockies.type';
import { MessageResponse } from 'src/common/types/message.type';
import { AuthService } from './services/auth.service';
import { ApiResponse } from '@nestjs/swagger';
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
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<User> {
    const user = await this.authService.login(loginUserDto);

    return user;
  }

  /**
   * Signs up a user
   */
  @Post('signup')
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User already exists',
  })
  signup(@Body() createUserDto: CreateUserDto): Promise<MessageResponse> {
    return this.authService.singup(createUserDto);
  }
}
