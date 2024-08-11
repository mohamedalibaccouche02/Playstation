import { IsString, IsNumber,IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTarifDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  
  @IsOptional()
  @IsString()
  typematch?: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @IsString()
  @IsNotEmpty()
  typeplay: string;
}
