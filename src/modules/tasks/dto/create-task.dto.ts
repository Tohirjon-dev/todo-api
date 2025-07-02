import { IsString, Length, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @MaxLength(100)
  title: string;
  @IsString()
  @MaxLength(300)
  description: string;
}
