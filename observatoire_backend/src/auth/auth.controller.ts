import { Controller } from '@nestjs/common';
import { Body, Post, Get, Param, Put, Delete, Query, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    
    @Get('contact')
    async getContactInfo() {
        return this.authService.getContactInfo();
  }

   @Get('rgpd')
    async getRGPD() {
        return this.authService.getRGPDMessage();
    }

    @Get('success')
    async getSuccess() {
        return this.authService.getSuccessMessage();
    }

    @Get('fail')
    async getFail() {
        return this.authService.getMessageEmailFail();
    }
    
}

