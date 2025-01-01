import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { SignUpDto } from './auth.dto';
import { UserService } from '../user/user.service';
import { IUser } from 'src/shared/interface/entities';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(body: SignUpDto) {
    const isUserExits = await this.userService.findUserByEmail(body.email);

    if (isUserExits) {
      throw new HttpException('User already exits', HttpStatus.CONFLICT);
    }

    const role = await this.userService.findRoleByRoleId(body.userType);

    if (!role) {
      throw new BadRequestException(
        `Role ID with role ${body.userType} not found`,
      );
    }
    const passwordHash = await this.encryptPassword(body.password);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash: password, ...user } =
      await this.userService.createUser({
        ...body,
        passwordHash,
        roleId: role.role_id,
      });

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new BadRequestException('Email or password is incorrect');
    }
    const isPasswordCorrect = await this.comparePassword(
      password,
      user.passwordHash,
    );

    if (!isPasswordCorrect) {
      throw new BadRequestException('Email or password is incorrect');
    }

    const token = await this.getAccessToken(user);

    return {
      access_token: token,
    };
  }

  private async encryptPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  private async comparePassword(password: string, passwordHash: string) {
    const result = await bcrypt.compare(password, passwordHash);
    return result;
  }

  private async getAccessToken(user: IUser) {
    const payload = {
      sub: user.id,
      role: user.roleId,
      email: user.email,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }
}
