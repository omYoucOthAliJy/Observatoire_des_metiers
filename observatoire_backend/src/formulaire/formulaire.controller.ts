import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Req,
  Res,
  BadRequestException,
  NotFoundException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { FormulaireService } from './formulaire.service';
import { CreateFormulaireDto } from './dto/create-formulaire-dto';
import { UpdateFormulaireDto } from './dto/update-formulaire-dto';
import { Formulaire } from './entity/form.entity';
import { FormStatus } from './enum';
import { Roles, UserRole } from 'src/user/roles/roles.decorator';
import { Request } from 'express';

import { Response } from 'express';

//@UseGuards(JwtAuthGuard)
@Controller('formulaires')
export class FormulaireController {
  constructor(private readonly formulaireService: FormulaireService) {}

  @Post()
  async createFormulaire(
    @Body() createFormulaireDto: CreateFormulaireDto,
  ): Promise<Formulaire> {
    return this.formulaireService.create(createFormulaireDto);
  }

  @Roles(UserRole.USER)
  @Post('submit')
  async submitFormulaire(
    @Body() createFormulaireDto: CreateFormulaireDto,
  ): Promise<Formulaire> {
    createFormulaireDto.status = FormStatus.SUBMIT;
    return this.formulaireService.create(createFormulaireDto);
  }

  @Post('save')
  async saveFormulaire(
    @Body() createFormulaireDto: CreateFormulaireDto,
  ): Promise<Formulaire> {
    createFormulaireDto.status = FormStatus.PENDING;
    return this.formulaireService.create(createFormulaireDto);
  }

  //@Roles(UserRole.USER)
  @Get()
  async findAll(): Promise<Formulaire[]> {
    return this.formulaireService.findAll();
  }

  @Roles(UserRole.ADMIN, UserRole.USER)
  // @Get(':id')
  // async findOne(@Param('id') id: number): Promise<Formulaire> {
  //   return this.formulaireService.findOne(id);
  // }

  /* UTILISE POUR VERIFIER L'UTILISATEUR */
  @Get(':id')
  async findOne(@Param('id') id: number, @Req() request: Request) {
    const user = request.user; // Utilisateur extrait du JWT
    return this.formulaireService.findOne(id, user);
  }

  @Roles(UserRole.ADMIN, UserRole.USER)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateFormulaireDto: UpdateFormulaireDto,
  ): Promise<Formulaire> {
    return this.formulaireService.update(id, updateFormulaireDto);
  }

  @Roles(UserRole.USER)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.formulaireService.remove(id);
  }
  @Get(':id/csv')
  async exportToCsv(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const csvString: string = await this.formulaireService.exportToCsv(id);

      // Envoyer le CSV en réponse
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename=formulaire-${id}.csv`,
      );
      res.status(HttpStatus.OK).send(csvString);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Formulaire non trouvé');
      }
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }
}
