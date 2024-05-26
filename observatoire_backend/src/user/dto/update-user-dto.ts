import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  readonly id: number;

  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly last_name: string;

  @IsOptional()
  @IsString()
  readonly birthday: string;

  @IsOptional()
  @IsString()
  readonly formation: string;

  @IsOptional()
  @IsString()
  readonly date_diplome: string;

  @IsOptional()
  @IsString()
  readonly description: string;
}
