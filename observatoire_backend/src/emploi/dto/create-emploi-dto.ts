import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEmploiDto {
  @IsString()
  @IsNotEmpty()
  titre: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  entreprise: string;

  @IsString()
  @IsNotEmpty()
  lieu: string;

  @IsString()
  @IsOptional()
  type_contrat?: string;

  @IsNumber()
  @IsOptional()
  salaire?: number;

  @IsString()
  @IsNotEmpty()
  contact_email: string;

  @IsString()
  @IsOptional()
  contact_telephone?: string;
}
