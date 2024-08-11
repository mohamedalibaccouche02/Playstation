import { IsString, IsNotEmpty, IsNumber , IsOptional } from 'class-validator';

export class CreateGameDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  image?: string;
  
  @IsNumber()
  @IsNotEmpty()
  playId: number;
}
