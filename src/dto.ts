import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class Dto {
  @IsString()
  @IsNotEmpty()
  icao: string;

  @IsString()
  @IsOptional()
  rw: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}
