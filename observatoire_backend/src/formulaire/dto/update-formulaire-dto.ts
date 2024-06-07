import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { Contrat, FormStatus } from '../enum';

export class UpdateFormulaireDto {
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
  @IsEnum(Contrat)
  type_contrat?: Contrat;

  @IsOptional()
  @IsNumber()
  mois?: number;

  @IsOptional()
  @IsNumber()
  Salair_brut?: number;

  @IsOptional()
  @IsEnum(FormStatus)
  status?: FormStatus;
}
