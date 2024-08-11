import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateGameDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  image?: string;
  
  @IsNumber()
  @IsOptional()
  playId?: number;
}
