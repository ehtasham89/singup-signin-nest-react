import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { helmetMiddleware } from './middlewares/helmet.middleware';
import { rateLimitMiddleware } from './middlewares/rate-limit.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  });

  helmetMiddleware(app);
  rateLimitMiddleware(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = process.env.PORT || 4000;

  await app.listen(port, '0.0.0.0');

  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
