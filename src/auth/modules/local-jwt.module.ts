import { Module } from '@nestjs/common';
import { LocalJwtService } from '../services/local-jwt.service';

@Module({
  providers: [LocalJwtService],
  exports: [LocalJwtService],
})
export class LocalJwtModule {}
