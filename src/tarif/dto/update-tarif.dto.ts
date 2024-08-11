import { IsString, IsNumber, IsOptional} from 'class-validator';

export class UpdateTarifDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  typematch?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsNumber()
  duration?: number;

  @IsOptional()
  @IsString()
  typeplay?: string;
}
