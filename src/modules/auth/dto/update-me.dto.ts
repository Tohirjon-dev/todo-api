import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateMeDto {
  @IsString()
  @Length(2, 72)
  @IsOptional()
  fullname?: string;
  @IsEmail()
  @Length(10, 128)
  @IsOptional()
  email?: string;
  @IsString()
  @Length(4, 16)
  @IsOptional()
  password?: string;
}
