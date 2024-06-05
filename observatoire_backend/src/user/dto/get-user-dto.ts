import { IsOptional, IsString, IsInt, Min, IsEnum, Matches } from 'class-validator';


enum SortEnum {
  ASC = "ASC",
  DESC = "DESC",
}


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
  name?: string;

  @IsOptional()
  @IsString()
  speciality?: string;

  @IsOptional()
  @IsString()
  formation?: string;

  @IsOptional()
  @IsString()
  @Matches(/^(19|20)\d{2}$/, {
    message: 'dateDiplome must be a valid year in the format YYYY',
  })
  date_diplome?: string;

  @IsEnum(SortEnum)
  @IsOptional()
  name_sort: SortEnum;

  @IsEnum(SortEnum)
  @IsOptional()
  date_diplome_sort?: SortEnum;

  @IsEnum(SortEnum)
  @IsOptional()
  speciality_sort?: SortEnum;

  @IsEnum(SortEnum)
  @IsOptional()
  formation_sort?: SortEnum;
}
