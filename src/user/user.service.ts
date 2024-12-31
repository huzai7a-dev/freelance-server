import { Injectable } from '@nestjs/common';
import { Role, User } from '../database/models';
import { IUser } from 'src/shared/interface/entities';
import { InjectModel } from '@nestjs/sequelize';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    @InjectModel(Role)
    private readonly roleModel: typeof Role,
  ) {}

  async findUserByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }

  async findRoleByRoleId(roleId: number) {
    return await this.roleModel.findOne({ where: { role_id: roleId } });
  }

  async createUser(user: Omit<IUser, 'id'>) {
    const createdUser = await this.userModel.create(user);
    return createdUser.toJSON();
  }
}
