import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmploiService } from './emploi.service';
import { EmploiController } from './emploi.controller';
import { Emploi } from './entity/emploi.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Emploi])],
  controllers: [EmploiController],
  providers: [EmploiService],
})
export class EmploiModule {}
