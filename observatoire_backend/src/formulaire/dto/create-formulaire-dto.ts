import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsEnum,
  Matches,
} from 'class-validator';
import { FormStatus, Contrat } from '../enum';

export class CreateFormulaireDto {
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
  @IsString()
  @Matches(/^[0-9]{5}$/, { message: 'Le code postal doit être exactement 5 chiffres' })
  code_postal?: string;

  @IsOptional()
  @IsString()
  ville?: string;

  @IsOptional()
  @IsString()
  courriel_pro?: string;

  @IsEnum(Contrat)
  @IsNotEmpty()
  type_contrat?: Contrat;

  @IsOptional()
  @IsNumber()
  mois?: number;

  @IsOptional()
  @IsNumber()
  Salair_brut?: number;

  @IsEnum(FormStatus)
  @IsNotEmpty()
  status: FormStatus; 
}
