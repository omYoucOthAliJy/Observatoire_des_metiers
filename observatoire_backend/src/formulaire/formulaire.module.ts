import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Formulaire } from './entity/form.entity';
import { FormulaireService } from './formulaire.service';
import { FormulaireController } from './formulaire.controller';
import { Question } from './entity/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Formulaire, Question])],
  providers: [FormulaireService],
  controllers: [FormulaireController],
})
export class FormulaireModule {}
