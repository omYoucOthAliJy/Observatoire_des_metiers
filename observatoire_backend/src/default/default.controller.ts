import { Controller } from '@nestjs/common';
import { Body, Post, Get, Param, Put, Delete, Query, BadRequestException } from '@nestjs/common';
import { DefaultService } from './default.service';

@Controller('default')
export class DefaultController {
    constructor(private defaultService: DefaultService) {}
    
    @Get('contact')
    async getContactInfo() {
        return this.defaultService.getContactInfo();
  }

   @Get('rgpd')
    async getRGPD() {
        return this.defaultService.getRGPDMessage();
    }

    @Get('success')
    async getSuccess() {
        return this.defaultService.getSuccessMessage();
    }

    @Get('fail')
    async getFail() {
        return this.defaultService.getMessageEmailFail();
    }
    
}

