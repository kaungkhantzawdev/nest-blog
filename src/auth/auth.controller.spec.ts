import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const fakeAuthController: Partial<AuthController> = {
      signUp: jest.fn(),
      singIn: jest.fn(),
    };

    const fakeAuthService: Partial<AuthService> = {
      singInService: jest.fn(),
      signupService: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
        JwtService,
        {
          provide: AuthController,
          useValue: fakeAuthController,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be sing up method defined', async () => {
    const user = {
      name: 'hello',
      email: 'abcd@gmail.com',
      password: '123',
    };

    const signUp = await controller.signUp(user);
    expect(signUp).toBeDefined;
  });

  it('should be sing in method defined', async () => {
    const user = {
      email: 'abcd@gmail.com',
      password: '123',
    };

    const signIn = await controller.singIn(user);
    expect(signIn).toBeDefined;
  });
});
