import { Body, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { DocumentedController } from '../common/decorators/documented-controller.decorator';
import { Cookies } from './decorators/coockies.decorator';
import { TCoockies } from './types/coockies.type';
import { TMessage } from 'src/common/types/message.type';
import { AuthService } from './services/auth.service';

@DocumentedController('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Logs in a user
   */
  @Post('login')
  login(@Cookies() coockies: TCoockies): { message: string } {
    console.log(coockies);
    return { message: 'Hello' };
  }

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto): Promise<TMessage> {
    return this.authService.singup(createUserDto);
  }
}
