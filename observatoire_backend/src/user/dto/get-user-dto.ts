import { IsOptional, IsString, IsInt, Min } from 'class-validator';

export class GetUsersDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  size?: number;

  @IsOptional()
  @IsString()
  formation?: string;

  @IsOptional()
  @IsString()
  letter?: string;

  @IsOptional()
  @IsString()
  startingWith?: string;

  @IsOptional()
  @IsString()
  dateDiplome?: string;
}
