import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Formulaire } from './entity/form.entity';
import { FormulaireService } from './formulaire.service';
import { FormulaireController } from './formulaire.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Formulaire])],
  providers: [FormulaireService],
  controllers: [FormulaireController],
})
export class FormulaireModule {}
