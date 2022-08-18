import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { graphqlUploadExpress } from 'graphql-upload-minimal';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.use(
    graphqlUploadExpress({
      // 1 GB max file size
      maxFileSize: 1024 * 1024 * 1000,
      maxFiles: 1,
    }),
  );

  await app.listen(3000);
}

bootstrap();
