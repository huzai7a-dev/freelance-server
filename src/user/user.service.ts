import { Injectable } from '@nestjs/common';
import { Role, User } from '../database/models';
import { IUser } from 'src/shared/interface/entities';
@Injectable()
export class UserService {
  constructor() {}

  async findUserByEmail(email: string) {
    return User.findOne({ where: { email } });
  }

  async findRoleByRoleId(roleId: number) {
    return await Role.findOne({ where: { role_id: roleId } });
  }

  async createUser(user: Omit<IUser, 'id'>) {
    return await User.create(user);
  }
}
