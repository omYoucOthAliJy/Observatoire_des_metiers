import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateEmploiDto {
  @IsString()
  @IsOptional()
  titre?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  entreprise?: string;

  @IsString()
  @IsOptional()
  lieu?: string;

  @IsString()
  @IsOptional()
  type_contrat?: string;

  @IsNumber()
  @IsOptional()
  salaire?: number;

  @IsString()
  @IsOptional()
  contact_email?: string;

  @IsString()
  @IsOptional()
  contact_telephone?: string;
}
