import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/modules/auth.module';
import { LocalPrismaModule } from '../local-prisma/local-prisma.module';
import { AppController } from './app.controller';

@Module({
  imports: [LocalPrismaModule, AuthModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
