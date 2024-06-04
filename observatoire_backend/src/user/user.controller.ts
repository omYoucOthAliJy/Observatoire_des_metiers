import { Body, Controller, FileTypeValidator, ParseFilePipe, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateUserDto } from "./dto/create-user-dto";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { User } from "./entity/user.entity";
import { IdentifyUserDto } from "./dto/identify-user.dto";

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
}
