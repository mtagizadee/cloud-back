import { Post } from '@nestjs/common';
import { DocumentedController } from '../common/decorators/documented-controller.decorator';
import { Cookies } from './decorators/coockies.decorator';
import { TCoockies } from './types/coockies.type';

@DocumentedController('auth')
export class AuthController {
  /**
   * Logs in a user
   */
  @Post('login')
  login(@Cookies() coockies: TCoockies): { message: string } {
    console.log(coockies);
    return { message: 'Hello' };
  }
}
