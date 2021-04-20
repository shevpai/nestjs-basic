import { IsNumber, IsString } from 'class-validator';

export class AddRoleDto {
  @IsString({ message: 'Must be string value' })
  // @IsEnum()
  readonly value: string;
  @IsNumber({}, { message: 'Must be integer' })
  readonly userId: number;
}
