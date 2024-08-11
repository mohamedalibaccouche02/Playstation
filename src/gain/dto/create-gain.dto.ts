import { IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateGainDto {
  @IsOptional()
  @IsNumber()
  liveGames?: number;

  @IsOptional()
  @IsNumber()
  totalGames?: number;

  @IsOptional()
  @IsNumber()
  liveDuration?: number;

  @IsOptional()
  @IsNumber()
  totalDuration?: number;

  @IsNumber()
  @IsNotEmpty()
  gameId: number;

  @IsNumber()
  @IsNotEmpty()
  tarifId: number;
}
