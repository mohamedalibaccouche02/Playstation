import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateGameDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsNumber()
  @IsOptional()
  playId?: number;
}
