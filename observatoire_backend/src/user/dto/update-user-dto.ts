import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Formation } from '../entity/formation.entity';
import { Speciality } from '../entity/speciality.entity';
import { Question } from '../entity/question.entity';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly email: string;

  @IsOptional()
  @IsString()
  readonly gender: string;

  @IsOptional()
  @IsString()
  readonly firstName: string;

  @IsOptional()
  @IsString()
  readonly lastName: string;

  @IsOptional()
  @IsString()
  readonly marriedName: string;

  @IsOptional()
  @IsString()
  readonly birthDate: string;

  @IsOptional()
  @IsString()
  readonly birthPlace: string;

  @IsOptional()
  @IsString()
  readonly birthCountry: string;

  @IsOptional()
  readonly formation: Formation;

  @IsOptional()
  readonly speciality: Speciality;

  @IsOptional()
  @IsString()
  readonly date_diplome: string;

  @IsOptional()
  @IsString()
  readonly address: string;

  @IsOptional()
  @IsString()
  readonly zipCode: string;

  @IsOptional()
  @IsString()
  readonly city: string;

  @IsOptional()
  @IsString()
  readonly country: string;

  @IsOptional()
  readonly question: Question;

  @IsOptional()
  @IsString()
  readonly answer: string;

  @IsOptional()
  @IsString()
  readonly password: string;

  @IsOptional()
  readonly blocked: boolean;

  @IsOptional()
  readonly firstConnection: boolean;
}