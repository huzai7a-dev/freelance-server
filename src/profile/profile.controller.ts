import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateProfileDto } from './profile.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('/profile')
export class ProfileController {
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('/')
  async createProfile(@Body() body: CreateProfileDto) {
    return body;
  }
}
