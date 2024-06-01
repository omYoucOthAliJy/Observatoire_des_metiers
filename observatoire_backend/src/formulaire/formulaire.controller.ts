import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { FormulaireService } from './formulaire.service';
import { CreateFormulaireDto } from './dto/create-formulaire-dto';
import { UpdateFormulaireDto } from './dto/update-formulaire-dto';
import { Formulaire } from './entity/form.entity';

@Controller('formulaires')
export class FormulaireController {
  constructor(private readonly formulaireService: FormulaireService) {}

  @Post()
  async createFormulaire(
    @Body() createFormulaireDto: CreateFormulaireDto,
  ): Promise<Formulaire> {
    return this.formulaireService.create(createFormulaireDto);
  }

  @Post('submit')
  async submitFormulaire(
    @Body() createFormulaireDto: CreateFormulaireDto,
  ): Promise<Formulaire> {
    createFormulaireDto.status = 'submitted';
    return this.formulaireService.create(createFormulaireDto);
  }

  @Post('save')
  async saveFormulaire(
    @Body() createFormulaireDto: CreateFormulaireDto,
  ): Promise<Formulaire> {
    createFormulaireDto.status = 'saved';
    return this.formulaireService.create(createFormulaireDto);
  }

  @Get()
  async findAll(): Promise<Formulaire[]> {
    return this.formulaireService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Formulaire> {
    return this.formulaireService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateFormulaireDto: UpdateFormulaireDto,
  ): Promise<Formulaire> {
    return this.formulaireService.update(id, updateFormulaireDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.formulaireService.remove(id);
  }
}
