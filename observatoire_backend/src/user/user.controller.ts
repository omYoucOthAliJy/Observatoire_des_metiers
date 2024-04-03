import { Body, Controller, Post, Get, Param, Put, Delete, Query, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import {Query as ExpressQuery} from 'express-serve-static-core';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
 

@Get()
async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
}

@Get('filter')
async getUsersByFormation(@Query('formation') formation: string): Promise<User[]> {
    if (!formation) {
        throw new BadRequestException('Formation parameter is required.');
    }
    return this.userService.findAllByFormation(formation);
}

@Post()
async createUser(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.create(user);
}

@Get(':id')
async getUser(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
}

@Put(':id')
async updateUser(@Param('id') id: number, @Body() user: UpdateUserDto): Promise<User> {
    return this.userService.updateById(id, user);
}

@Delete(':id')
async deleteUser(@Param('id') id: number): Promise<string> {
    return this.userService.deleteById(id);
}
}
