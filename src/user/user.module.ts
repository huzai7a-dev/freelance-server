import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role, User } from '../database/models';
@Module({
  imports: [SequelizeModule.forFeature([User, Role])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
