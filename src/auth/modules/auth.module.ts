import { Module } from '@nestjs/common';
import { UsersModule } from '../../users/users.module';
import { AuthController } from '../auth.controller';
import { AuthService } from '../services/auth.service';
import { LocalJwtModule } from './local-jwt.module';

@Module({
  imports: [LocalJwtModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
