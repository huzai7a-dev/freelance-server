import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignUpDto } from './auth.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: 201,
    description: 'Register new user',
  })
  @Post('/signup')
  async signup(@Body() body: SignUpDto) {
    return await this.authService.signUp(body);
  }

  @ApiResponse({
    status: 200,
    description: 'Authenticate the user',
  })
  @Post('/login')
  async login(@Body() body: LoginDto) {
    return await this.authService.login(body.email, body.password);
  }
}
