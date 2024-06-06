import { IsNotEmpty, IsString, IsStrongPassword, Validate } from "class-validator";


export class UpdateUserPasswordDto {
    @IsString()
    @IsNotEmpty()
    currentPassword: string;

    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    newPassword: string;

    @IsString()
    @IsNotEmpty()
    @Validate((obj) => obj.newPassword === obj.confirmNewPassword, {
        message: 'Passwords do not match',
    })
    confirmNewPassword: string;
}