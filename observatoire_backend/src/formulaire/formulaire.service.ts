import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Formulaire } from './entity/form.entity';
import { CreateFormulaireDto } from './dto/create-formulaire-dto';
import { UpdateFormulaireDto } from './dto/update-formulaire-dto';

@Injectable()
export class FormulaireService {
  constructor(
    @InjectRepository(Formulaire)
    private formulaireRepository: Repository<Formulaire>,
  ) {}

  async create(createFormulaireDto: CreateFormulaireDto): Promise<Formulaire> {
    const formulaire = this.formulaireRepository.create(createFormulaireDto);
    return await this.formulaireRepository.save(formulaire);
  }

  async findAll(): Promise<Formulaire[]> {
    return await this.formulaireRepository.find({ relations: ['questions'] });
  }

  async findOne(id: number): Promise<Formulaire> {
    const formulaire = await this.formulaireRepository.findOneBy({ id });
    if (!formulaire) {
      throw new NotFoundException('Formulaire not found');
    }
    return formulaire;
  }

  async update(
    id: number,
    updateFormulaireDto: UpdateFormulaireDto,
  ): Promise<Formulaire> {
    const updateResult = await this.formulaireRepository.update(
      id,
      updateFormulaireDto,
    );
    if (updateResult.affected === 0) {
      throw new NotFoundException(`Formulaire with ID ${id} not found`);
    }
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.formulaireRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Formulaire not found');
    }
  }
}
