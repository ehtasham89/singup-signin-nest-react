import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/signup (POST) should create a user', async () => {
    const signupDto = {
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'PassWord@123',
    };

    return request(app.getHttpServer())
      .post('/auth/signup')
      .send(signupDto)
      .expect(201)
      .expect(({ body }) => {
        expect(body).toHaveProperty('name', 'Test User');
        expect(body).toHaveProperty('email', 'testuser@example.com');
      });
  });

  it('/auth/login (POST) should login a user', async () => {
    const loginDto = {
      email: 'testuser@example.com',
      password: 'PassWord@123',
    };

    return request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toHaveProperty('accessToken');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
