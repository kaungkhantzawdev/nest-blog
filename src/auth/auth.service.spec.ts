import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const fakeAuthService: Partial<AuthService> = {
      signupService: jest.fn(),
      singInService: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [configuration],
        }),
      ],
      providers: [
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('signup ', async () => {
    const user = {
      name: 'hello',
      email: 'abcd@gmail.com',
      password: '123',
    };

    // const result = {
    //   access_token: '',
    //   user: {
    //     email: '',
    //     name: '',
    //   },
    // };

    // jest.spyOn(service, 'signupService').mockImplementation((user.name, user.email, user.password) => result);

    const signup = await service.signupService(
      user.name,
      user.email,
      user.password,
    );

    expect(signup).toBeDefined;

    // expect(signup.user.name).toEqual(user.name);

    // expect(signup.access_token).toBe(expect.toString);
  });
});
