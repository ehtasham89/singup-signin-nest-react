import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as cookieParser from 'cookie-parser';
import { AppModule } from '../src/app.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let cookie: string;
  const email = `testuser${new Date()}@example.com`;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(cookieParser());
    await app.init();
  });

  it('/auth/signup (POST) should create a user', async () => {
    const signupDto = {
      name: 'Test User',
      email: email,
      password: 'PassWord@123',
    };

    return request(app.getHttpServer())
      .post('/auth/signup')
      .send(signupDto)
      .expect(201)
      .expect(({ body }) => {
        expect(body).toHaveProperty('name', 'Test User');
        expect(body).toHaveProperty('email', email);
      });
  });

  it('/auth/login (POST) should login a user and return JWT in cookie', async () => {
    const loginDto = {
      email: email,
      password: 'PassWord@123',
    };

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(200);

    cookie = loginResponse.headers['set-cookie'][0];
    expect(cookie).toBeDefined();
  });

  it('/user/profile (GET) - Protected Route', async () => {
    return request(app.getHttpServer())
      .get('/user/profile')
      .set('Cookie', cookie)
      .expect(200);
  }, 10000);

  afterAll(async () => {
    await app.close();
  });
});
