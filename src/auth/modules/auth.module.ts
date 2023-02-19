import { Module } from '@nestjs/common';
import { AuthController } from '../auth.controller';
import { AuthService } from '../services/auth.service';
import { LocalJwtModule } from './local-jwt.module';

@Module({
  imports: [LocalJwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
