import { INestApplication } from '@nestjs/common/interfaces';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function build(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);
  return app;
}

async function start(): Promise<void> {
  const PORT = process.env.PORT || 3000;
  const app = await build();

  await app.listen(PORT, () => {
    console.log(`Server started on the port: ${PORT}`);
  });
}

start();
