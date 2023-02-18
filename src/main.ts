import { INestApplication } from '@nestjs/common/interfaces';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function build(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cloud backend API')
    .setDescription('The backend API for the cloud project')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

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
