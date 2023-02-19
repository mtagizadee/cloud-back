import { Post } from '@nestjs/common';
import { DocumentedController } from '../common/decorators/documented-controller.decorator';

@DocumentedController('auth')
export class AuthController {
  /**
   * Logs in a user
   */
  @Post('login')
  login() {}
}
