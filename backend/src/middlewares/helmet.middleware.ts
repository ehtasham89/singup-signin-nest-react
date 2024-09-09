import { INestApplication } from '@nestjs/common';
import helmet from 'helmet';

export function helmetMiddleware(app: INestApplication) {
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    }),
  );
}