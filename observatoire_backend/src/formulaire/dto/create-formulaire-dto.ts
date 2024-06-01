import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateFormulaireDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsOptional()
  @IsNumber()
  temps?: number;

  @IsOptional()
  @IsString()
  Localisation?: string;

  @IsOptional()
  @IsString()
  signature?: string;

  @IsOptional()
  @IsString()
  Entreprise?: string;

  @IsOptional()
  @IsString()
  Nom_group?: string;

  @IsOptional()
  @IsString()
  secteur_activite?: string;

  @IsOptional()
  @IsString()
  fonction?: string;

  @IsOptional()
  @IsString()
  adresse_entreprise?: string;

  @IsOptional()
  @IsString()
  Pays?: string;

  @IsOptional()
  @IsNumber()
  code_postal?: number;

  @IsOptional()
  @IsString()
  ville?: string;

  @IsOptional()
  @IsString()
  courriel_pro?: string;

  @IsOptional()
  @IsString()
  type_contrat?: string;

  @IsOptional()
  @IsNumber()
  mois?: number;

  @IsOptional()
  @IsNumber()
  Salair_brut?: number;

  @IsString()
  @IsNotEmpty()
  status: string;
}
