import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LocalJwtModule } from './local-jwt.module';

@Module({
  imports: [LocalJwtModule],
  providers: [AuthService],
})
export class AuthModule {}
