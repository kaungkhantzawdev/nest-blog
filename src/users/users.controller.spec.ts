import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthGuard } from '../guards/auth.guard';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const fakeUserService: Partial<UsersService> = {
      findAll: () => Promise.resolve([]),
    };

    const fakeAuthGuard = { canActivate: jest.fn(() => true) };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(fakeAuthGuard)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('find all users', async () => {
    const users = await controller.findAllUsers();
    expect(users.entries).toBeDefined;
  });
});
