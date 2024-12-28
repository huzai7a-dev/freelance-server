import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, UserService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create new user', async () => {
    const body = {
      email: 'test@gmail.com',
      password: 'test123',
      firstName: 'test',
      lastName: 'test',
      userType: 1,
    };
    const result = await controller.signup(body);

    expect(result).toBeDefined();
    expect(result.email).toEqual(body.email);
  });
});
