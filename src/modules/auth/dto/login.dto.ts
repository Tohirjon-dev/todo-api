import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @Length(4, 128)
  @IsNotEmpty()
  email: string;
  @IsString()
  @Length(4, 16)
  @IsNotEmpty()
  password: string;
}
