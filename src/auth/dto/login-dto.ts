import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com', description: 'Email address' })
  readonly email: string;
  @ApiProperty({ example: 'test1234', description: 'User password' })
  readonly password: string;
}
