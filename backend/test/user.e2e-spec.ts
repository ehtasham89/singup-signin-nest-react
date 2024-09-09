import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const signupDto = {
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'ValidPass@123',
    };

    await request(app.getHttpServer())
      .post('/auth/signup')
      .send(signupDto)
      .expect(201);

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: signupDto.email,
        password: signupDto.password,
      })
      .expect(200);

    accessToken = loginResponse.body.accessToken;
  });

  it('/user/profile (GET) - Protected Route', async () => {
    return request(app.getHttpServer())
      .get('/user/profile')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toHaveProperty('userId');
        expect(body).toHaveProperty('email');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
