import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { mockRoles } from '../shared/constants/test.constants';

describe('AuthService', () => {
  let service: AuthService;

  const mockUser = {
    id: 1,
    userType: 1,
    email: 'test@gmail.com',
    password: 'test123',
    firstName: 'test',
    lastName: 'test',
  };

  const MockUserService = {
    findUserByEmail: jest.fn().mockImplementation(() => mockUser),
    findRoleByRoleId: jest
      .fn()
      .mockImplementation((roleType) => mockRoles[roleType % 2]),
    createUser: jest.fn().mockImplementation((user) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...createdUser } = user as typeof mockUser;
      return {
        createdUser,
        hashPassword: 'testPassword',
      };
    }),
  };

  const MockJwtService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserService, JwtService],
    })
      .overrideProvider([UserService, JwtService])
      .useValue([MockUserService, MockJwtService])
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
