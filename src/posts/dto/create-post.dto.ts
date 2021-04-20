import { IsString } from 'class-validator';

export class CreatePostDto {
  @IsString({ message: 'Must be string value' })
  readonly title: string;
  @IsString({ message: 'Must be string value' })
  readonly content: string;
}
