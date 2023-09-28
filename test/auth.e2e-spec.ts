import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  const user = {
    name: 'hello',
    email: 'begined@gmail.com',
    password: '123',
  };

  it('SIGN UP / (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/sign-up')
      .send({ name: user.name, email: user.email, password: user.password })
      .expect(201);
  });

  it('SIGN UP { Error } / (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/sign-up')
      .send({ name: user.name, email: 'abc', password: user.password })
      .expect(400);
  });

  it('SIGN IN / (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/sign-in')
      .send({ email: user.email, password: user.password })
      .expect(201);
  });

  it('SIGN IN { Error } / (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/sign-in')
      .send({ email: 'no', password: user.password })
      .expect(400);
  });
});
