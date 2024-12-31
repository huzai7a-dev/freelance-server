import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { mockRoles } from '../shared/constants/test.constants';

describe('AuthService', () => {
  let service: AuthService;

  const mockUser = {
    id: 1,
    userType: 2,
    email: 'test@gmail.com',
    password: 'test123',
    firstName: 'test',
    lastName: 'test',
  };

  const MockUserService = {
    findUserByEmail: jest
      .fn()
      .mockImplementation((newUser) =>
        newUser.email === mockUser.email ? mockUser : null,
      ),
    findRoleByRoleId: jest.fn().mockImplementation(() => mockRoles[0]),
    createUser: jest.fn().mockImplementation(() => mockUser),
  };

  const MockJwtService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserService, JwtService],
    })
      .overrideProvider(UserService)
      .useValue(MockUserService)
      .overrideProvider(JwtService)
      .useValue(MockJwtService)
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should signup the user successfully', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...dto } = mockUser;
    const result = await service.signUp(dto);

    expect(MockUserService.findUserByEmail).toHaveBeenCalledWith(dto.email);
    expect(MockUserService.findRoleByRoleId).toHaveBeenCalledWith(dto.userType);
    expect(result).toEqual(mockUser);
  });
});
