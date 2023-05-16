import { IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
  readonly username: string;

  @IsEmail()
  @IsOptional()
  readonly email: string;

  readonly image: string;
  readonly bio: string;
}
