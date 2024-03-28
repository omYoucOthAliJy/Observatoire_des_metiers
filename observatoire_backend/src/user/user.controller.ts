import { Body, Controller, Post, Get, Param, Put, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import {Query as ExpressQuery} from 'express-serve-static-core';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
 
    @ Get()
    async getAllUsers():Promise <User[]> {
        return this.userService.findAll();
    }

    @ Get('filter')
    async getUsersByFormation(@Query() query : ExpressQuery):Promise <User[]> {
        return this.userService.findAllByFormation(query);
    }

    @Post()
    async createUser(
        @Body()
        user:CreateUserDto
    ):Promise <User> {
        return this.userService.create(user);
    }

    




}
