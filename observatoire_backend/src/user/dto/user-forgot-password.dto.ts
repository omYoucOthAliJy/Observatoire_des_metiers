import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UserForgotPasswordDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNumber()
    @IsNotEmpty()
    questionId: number;

    @IsString()
    @IsNotEmpty()
    answer: string;
}