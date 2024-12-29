import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  const MockAuthService = {
    signUp: jest.fn().mockImplementation((dto) => {
      return {
        id: 1,
        ...dto,
      };
    }),

    login: jest.fn().mockImplementation(() => {
      return {
        access_token: 'token',
      };
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(MockAuthService)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create new user', async () => {
    const dto = {
      email: 'test@gmail.com',
      password: 'test123',
      firstName: 'test',
      lastName: 'test',
      userType: 1,
    };
    const result = await controller.signup(dto);

    expect(MockAuthService.signUp).toHaveBeenCalledWith(dto);
    expect(result).toBeDefined();
    expect(result).toEqual({
      id: 1,
      ...dto,
    });
  });

  it('should return access token of login user', async () => {
    const dto = {
      email: 'test@gmail.com',
      password: 'test123',
    };

    const response = {
      access_token: 'token',
    };

    const result = await controller.login(dto);

    expect(MockAuthService.login).toHaveBeenCalledWith(dto.email, dto.password);
    expect(result).toEqual(response);
  });
});
