import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @Length(2, 72)
  fullname: string;
  @IsEmail()
  @IsNotEmpty()
  @Length(4, 128)
  email: string;
  @IsString()
  @IsNotEmpty()
  @Length(4, 16)
  password: string;
}
