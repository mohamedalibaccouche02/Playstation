import { IsNumber, IsOptional } from 'class-validator';

export class UpdateGainDto {
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

  @IsOptional()
  @IsNumber()
  gameId?: number;

  @IsOptional()
  @IsNumber()
  tarifId?: number;
}
