import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
  Query,
  BadRequestException,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { RolesGuard } from './roles/role.guard';
import { GetUsersDto } from './dto/get-user-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { Roles, UserRole } from './roles/roles.decorator';

@UseGuards(RolesGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Roles(UserRole.ADMIN)
  @Get('filter')
  async getUsersByCriteria(
    @Query() getUsersDto: GetUsersDto,
  ): Promise<{ data: User[]; count: number }> {
    const result = await this.userService.getUsersByCriteria(getUsersDto);
    return result;
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  //@Roles(UserRole.ADMIN)
  @Get('formation')
  async getUsersByFormation(
    @Query('formation') formation: string,
  ): Promise<User[]> {
    if (!formation) {
      throw new BadRequestException('Formation parameter is required.');
    }
    return this.userService.findAllByFormation(formation);
  }
  //@Roles(UserRole.ADMIN)
  @Get('fletter')
  async findAllByFirstLetter(
    @Query('letter') fletter: string,
  ): Promise<User[]> {
    return this.userService.findAllByFirstLetter(fletter);
  }

  //@Roles(UserRole.ADMIN)
  @Get('startsWith')
  async findAllByNameStartingWith(
    @Query('startingWith') startingWith: string,
  ): Promise<User[]> {
    return this.userService.findAllByNameStartingWith(startingWith);
  }

  //@Roles(UserRole.ADMIN)
  @Get('byDateDiplome')
  async findAllByDateDiplome(
    @Query('dateDiplome') dateDiplome: string,
  ): Promise<User[]> {
    return this.userService.findAllByDateDiplome(dateDiplome);
  }

  @Roles(UserRole.ADMIN)
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }

  @Roles(UserRole.USER)
  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.create(user);
  }

  @Roles(UserRole.ADMIN)
  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() user: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateById(id, user);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<string> {
    return this.userService.deleteById(id);
  }

  // @Post('upload')
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: './user/csv_file',
  //       filename: (req, file, cb) => {
  //         const ext = path.extname(file.originalname);
  //         const filename = `${path.basename(file.originalname, ext)}-${Date.now()}${ext}`;
  //         cb(null, filename);
  //       },
  //     }),
  //   }),
  // )
  // async uploadCsv(@UploadedFile() file: any): Promise<any> {
  //   await this.userService.uploadCsv(file.path);
  //   return { message: 'File processed successfully' };
  // }
  @Post('upload')
  async uploadCsv(): Promise<any> {
    try {
      const filePath = './csv_file/user.csv'; // Chemin local du fichier CSV
      await this.userService.uploadCsv(filePath);
      return { message: 'File processed successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
