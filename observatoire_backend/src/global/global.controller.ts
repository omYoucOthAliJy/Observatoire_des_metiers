import { Controller, Get } from '@nestjs/common';
import { GlobalService } from './global.service';
import { Question } from 'src/user/entity/question.entity';

@Controller('global')
export class GlobalController {
    constructor(
        private readonly globalService:  GlobalService
    ) {}


    
    @Get('/questions') 
    async getListOfQuestions():Promise<Question[]> {
        return await this.globalService.getQuestionsList();
    }

    @Get('/specialities') 
    async getListOfSpecialities():Promise<Question[]> {
        return await this.globalService.getSpecialitiesList();
    }

    @Get('/formations') 
    async getListOfFormations():Promise<Question[]> {
        return await this.globalService.getFormationsList();
    }
}
