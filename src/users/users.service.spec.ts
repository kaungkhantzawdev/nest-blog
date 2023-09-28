import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './schemas/users.schema';
import { CreateUserDto } from './dtos/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const fakeUserService: Partial<UsersService> = {
      findAll: () => Promise.resolve([]),
      create: (createUserDto: CreateUserDto): Promise<User> =>
        Promise.resolve(createUserDto as User),
      findById: (id: string): Promise<User> =>
        Promise.resolve({
          id: id,
          name: 'string',
          email: 'abcdefg@gmail.com',
          password: 'string',
          facebook: 'string',
          google: 'string',
        }),
      findByEmail: (email: string): Promise<User> =>
        Promise.resolve({
          id: 'abc',
          name: 'string',
          email: email,
          password: 'string',
          facebook: 'string',
          google: 'string',
        }),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('find all users', async () => {
    const data = await service.findAll();
    expect(data).toBeDefined;
  });

  it('create user', async () => {
    const createUser = {
      name: 'hello',
      email: 'abc@gmail.com',
      password: 'abcd',
    };
    const user = await service.create(createUser);
    expect(user.email).toBe(createUser.email);
  });

  it('find by id', async () => {
    const expectedUser = {
      id: '6512a946c9cfd1e36e201685',
      email: 'abcdefg@gmail.com',
    };
    const user = await service.findById(expectedUser.id);
    expect(user.email).toBe(expectedUser.email);
  });

  it('find by email', async () => {
    const expectedUser = {
      id: '6512a946c9cfd1e36e201685',
      email: 'abcdefg@gmail.com',
    };
    const user = await service.findById(expectedUser.email);
    expect(user.email).toBe(expectedUser.email);
  });
});
