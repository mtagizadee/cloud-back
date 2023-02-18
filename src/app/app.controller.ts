import { Get } from '@nestjs/common';
import { DocumentedController } from '../common/decorators/documented-controller.decorator';

@DocumentedController({ name: 'app', path: '/' })
export class AppController {
  /**
   * Get Hello World message to test the API
   */
  @Get()
  getHello(): string {
    return 'Hello world!';
  }
}
