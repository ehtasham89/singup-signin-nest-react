import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { helmetMiddleware } from './middlewares/helmet.middleware';
import { rateLimitMiddleware } from './middlewares/rate-limit.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  });

  helmetMiddleware(app);
  rateLimitMiddleware(app);

  await app.listen(process.env.PORT || 4000);
}

bootstrap();
