import { IsString, Length } from 'class-validator';

export class updateUser {
  @IsString()
  @Length(4, 16)
  password: string;
}
