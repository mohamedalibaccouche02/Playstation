import { IsString, IsOptional, IsArray, IsNumber } from 'class-validator';

export class UpdatePlayDto {
  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true }) // Ensure each item in the array is a number
  gameIds?: number[];
}
