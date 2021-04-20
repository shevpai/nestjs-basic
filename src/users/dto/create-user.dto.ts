import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Alex', description: 'User name' })
  @IsString({ message: 'Must be string value' })
  readonly name: string;
  @ApiProperty({ example: 'user@example.com', description: 'Email address' })
  @IsString({ message: 'Must be string value' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  readonly email: string;
  @ApiProperty({ example: 'test1234', description: 'User password' })
  @IsString({ message: 'Must be string value' })
  @Length(8, 32, { message: 'Password must be more than 8 characters' })
  readonly password: string;
}
