import { Injectable } from '@nestjs/common';
import { Formation } from 'src/user/entity/formation.entity';
import { Question } from 'src/user/entity/question.entity';
import { Speciality } from 'src/user/entity/speciality.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class GlobalService {
    constructor(
        private readonly entityManager: EntityManager
    ){}

    async getQuestionsList(): Promise<Question[]> {
        return await this.entityManager.find(Question);
    }

    async getSpecialitiesList(): Promise<Speciality[]> {
        return await this.entityManager.find(Speciality);
    }

    async getFormationsList(): Promise<Formation[]> {
        return await this.entityManager.find(Formation);
    }
}
