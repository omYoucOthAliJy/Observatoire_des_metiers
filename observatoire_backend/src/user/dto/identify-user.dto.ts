import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Matches } from "class-validator";
import { GenderEnum } from "../enum/gender.enum";
import { Transform } from "class-transformer";

export class IdentifyUserDto {

    @IsEnum(GenderEnum)
    @IsNotEmpty()
    gender: GenderEnum;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.toLowerCase())
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.toLowerCase())
    lastName: string;

    @IsString()
    @IsOptional()
    @Transform(({ value }) => value.toLowerCase())
    marriedName: string;

    @IsString()
    @Matches(/^([0-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/([0-9]{4})$/, { message: 'La date doit être au format jj/mm/aaaa' })
    @IsNotEmpty()
    birthDate: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.toLowerCase())
    birthPlace: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.toLowerCase())
    birthCountry: string;

    @IsNumber()
    @IsNotEmpty()
    formationId: number;

    @IsNumber()
    @IsNotEmpty()
    specialityId: number;

    @IsString()
    @Matches(/^([0-9]{4})$/, { message: 'La date doit être au format jj/mm/aaaa' })
    @IsNotEmpty()
    date_diplome: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.toLowerCase())
    address: string;

    @IsString()
    @Matches(/^[0-9]{5}$/, { message: 'Le code postal doit être exactement 5 chiffres' })
    zipCode: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.toLowerCase())
    city: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.toLowerCase())
    country: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.toLowerCase())
    nationality;

    @IsNumber()
    @IsNotEmpty()
    questionId: number;

    @IsString()
    @IsNotEmpty()
    answer: string;

}