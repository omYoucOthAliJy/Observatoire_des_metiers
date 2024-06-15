import { IsString, IsNumber, IsOptional, IsEnum, Matches, IsNotEmpty, IsBoolean } from 'class-validator';
import { Contrat, FormStatus } from '../enum';

export class UpdateFormulaireDto {
  @IsOptional()
  @IsNumber()
  temps?: number;

  @IsOptional()
  @IsString()
  localisation?: string;

  @IsOptional()
  @IsString()
  entreprise?: string;

  @IsOptional()
  @IsString()
  nom_group?: string;

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
  pays?: string;

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

  @IsOptional()
  @IsEnum(Contrat)
  type_contrat?: Contrat;

  @IsOptional()
  @IsNumber()
  mois?: number;

  @IsOptional()
  @IsNumber()
  salair_brut?: number;

  @IsOptional()
  @IsBoolean()
  embauche_cadre: boolean;

  @IsEnum(FormStatus)
  @IsNotEmpty()
  status: FormStatus; 
}
