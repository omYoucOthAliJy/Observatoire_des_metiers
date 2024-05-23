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
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { RolesGuard } from './roles/role.guard';
import { GetUsersDto } from './dto/get-user-dto';

// @UseGuards(RolesGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('filter')
  async getUsersByCriteria(
    @Query() getUsersDto: GetUsersDto,
  ): Promise<{ data: User[]; count: number }> {
    //this.logger.log('Fetching users by criteria', JSON.stringify(getUsersDto));
    const result = await this.userService.getUsersByCriteria(getUsersDto);
    //this.logger.log(`Found ${result.count} users matching criteria`);
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

  //@Roles(UserRole.ADMIN)
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }

  //@Roles(UserRole.USER)
  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.create(user);
  }

  //@Roles(UserRole.ADMIN)
  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() user: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateById(id, user);
  }

  //@Roles(UserRole.ADMIN)
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<string> {
    return this.userService.deleteById(id);
  }
}
