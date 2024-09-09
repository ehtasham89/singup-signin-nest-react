import { INestApplication } from '@nestjs/common';
import rateLimit from 'express-rate-limit';

export function rateLimitMiddleware(app: INestApplication) {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 150,
    message: 'Your IP is restricted, please try again after 15 minutes',
  });

  app.use(limiter);
}
