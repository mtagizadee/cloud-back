import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LocalJwtService } from '../services/local-jwt.service';

@Module({
  imports: [JwtModule.register({})],
  providers: [LocalJwtService],
  exports: [LocalJwtService],
})
export class LocalJwtModule {}
