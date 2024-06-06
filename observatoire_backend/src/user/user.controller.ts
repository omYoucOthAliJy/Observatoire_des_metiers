import { Body, ClassSerializerInterceptor, Controller, FileTypeValidator, Get, Param, ParseFilePipe, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateUserDto } from "./dto/create-user-dto";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { User } from "./entity/user.entity";
import { IdentifyUserDto } from "./dto/identify-user.dto";
import { GetUsersDto } from "./dto/get-user-dto";
import { GetUserByEmailDto } from "./dto/get_user_by_email.dto";
import { UserForgotPasswordDto } from "./dto/user-forgot-password.dto";
import { UpdateUserPasswordDto } from "./dto/update-user-password.dto";



@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async signup(@Body() createUserDto: CreateUserDto): Promise<any> {
    await this.userService.createUser(createUserDto);
    return { message: 'Account created successfully.' };
  }

  @UseGuards(AuthGuard('jwt_user'))
  @Post('identification')
  async identifyUser(@Req() request: Request, @Body() identifyUserDto: IdentifyUserDto): Promise<any> {
    const user = request.user as User;
    await this.userService.identifyUser(user.email, identifyUserDto);
    return { message: 'User identified successfully.' };
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  async uploadCsv(
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: true,
        validators: [
          new FileTypeValidator({ fileType: 'text/csv' })
        ]
      })
    ) file: Express.Multer.File,
  ): Promise<any> {
    await this.userService.uploadCsv(file);
    return { message: 'CSV file uploaded and processed successfully.' };
  }


  @Get()
  async getListOfUsers(@Query(ValidationPipe) getUsersDto: GetUsersDto): Promise<{data: User[], count: number}> {
    return await this.userService.getUsersByCriteria(getUsersDto);
  }


  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return await this.userService.getUserById(id);
  }

  @Get('/email')
  async getUserByEmail(@Query(ValidationPipe) getUserByEmailDto: GetUserByEmailDto): Promise<User> {
    return await this.userService.getUserByEmail(getUserByEmailDto);
  }


  @UseGuards(AuthGuard('jwt_user'))
  @Put('/password')
  async userUpdatePassword(@Req() request: Request,@Body() updateUserPasswordDto: UpdateUserPasswordDto): Promise<{message: string}> {
    const user = request.user as User;
    await this.userService.updateCurrentUserPassword(user.id, updateUserPasswordDto);

    return { message: 'Password updated successfully.' };
  }

  @Put('/forgot/password')
  async userForgotPassword(@Body() userForgotPasswordDto: UserForgotPasswordDto): Promise<void> {
    return await this.userService.userForgotPassword(userForgotPasswordDto);
  }
}
