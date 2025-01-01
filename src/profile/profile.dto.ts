import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateProfileDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  bio?: string;

  @ApiProperty({ example: ['development', 'graphic designing'] })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  skills?: string[];

  @ApiProperty({ example: ['link1', 'link2', 'link3'] })
  @IsNotEmpty()
  @IsArray()
  @IsUrl({}, { each: true })
  portfolio_links?: string[];

  @IsOptional()
  @IsString()
  profile_picture?: string;
}
