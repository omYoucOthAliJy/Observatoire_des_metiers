import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmploiDto } from './dto/create-emploi-dto';
import { UpdateEmploiDto } from './dto/update-emploi-dto';
import { Emploi } from './entity/emploi.entity';

@Injectable()
export class EmploiService {
  constructor(
    @InjectRepository(Emploi)
    private readonly emploiRepository: Repository<Emploi>,
  ) {}

  create(createEmploiDto: CreateEmploiDto): Promise<Emploi> {
    const newEmploi = this.emploiRepository.create(createEmploiDto);
    return this.emploiRepository.save(newEmploi);
  }

  async findAll(
    page: number,
    size: number,
    createdAt: 'ASC' | 'DESC',
  ): Promise<Emploi[]> {
    return await this.emploiRepository.find({
      order: {
        created_at: createdAt,
      },
      skip: (page - 1) * size,
      take: size,
    });
  }

  async findOneById(id: number): Promise<Emploi> {
    const emploi = await this.emploiRepository.findOneBy({ id: id });
    if (!emploi) {
      throw new NotFoundException(`Emploi with ID ${id} not found`);
    }
    return emploi;
  }

  async update(id: number, updateEmploiDto: UpdateEmploiDto): Promise<Emploi> {
    await this.emploiRepository.update(id, updateEmploiDto);
    const updatedEmploi = await this.emploiRepository.findOneBy({ id: id });
    if (!updatedEmploi) {
      throw new NotFoundException(`Emploi with ID ${id} not found`);
    }
    return updatedEmploi;
  }

  async remove(id: number): Promise<void> {
    const result = await this.emploiRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Emploi with ID ${id} not found`);
    }
  }
}
