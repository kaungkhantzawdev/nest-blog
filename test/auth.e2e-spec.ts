import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('SIGN UP / (POST)', () => {
    const user = {
      name: 'hello',
      email: 'abcdefgh@gmail.com',
      password: '123',
    };

    return request(app.getHttpServer())
      .post('/auth/sign-up')
      .send({ name: user.name, email: user.email, password: user.password })
      .expect(201);
  });
});
