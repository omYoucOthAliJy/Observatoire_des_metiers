import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly last_name: string;

  @IsNotEmpty()
  @IsString()
  readonly birthday: string;

  @IsNotEmpty()
  @IsString()
  readonly formation: string;

  @IsNotEmpty()
  @IsString()
  readonly date_diplome: string;

  //@IsNotEmpty()
  @IsString()
  readonly description: string;
}
