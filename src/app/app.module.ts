import { Module } from '@nestjs/common';
import { LocalPrismaModule } from '../local-prisma/local-prisma.module';
import { AppController } from './app.controller';

@Module({
  imports: [LocalPrismaModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
