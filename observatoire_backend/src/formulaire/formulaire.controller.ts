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
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { FormulaireService } from './formulaire.service';
import { CreateFormulaireDto } from './dto/create-formulaire-dto';
import { UpdateFormulaireDto } from './dto/update-formulaire-dto';
import { Formulaire } from './entity/form.entity';
import { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entity/user.entity';


@UseInterceptors(ClassSerializerInterceptor)
@Controller('formulaires')
export class FormulaireController {
  constructor(private readonly formulaireService: FormulaireService) {}

  @UseGuards(AuthGuard('jwt_user'))
  @Post()
  async createUserFormulaire(
    @Req() request: Request,
    @Body() createFormulaireDto: CreateFormulaireDto,
  ): Promise<Formulaire> {
    const user = request.user as User;
    return this.formulaireService.create(user.id, createFormulaireDto);
  }

  @UseGuards(AuthGuard('jwt_user'))
  @Put(':id')
  async update(
    @Req() request: Request,
    @Param('id') id: number,
    @Body() updateFormulaireDto: UpdateFormulaireDto,
  ): Promise<void> {
    const user = request.user as User;
    console.log(user)
    return this.formulaireService.update(user.id, id, updateFormulaireDto);
  }

  @UseGuards(AuthGuard('jwt_user'))
  @Delete(':id')
  async remove(@Req() request: Request, @Param('id') id: number): Promise<void> {
    const user = request.user as User;
    return this.formulaireService.remove(user.id, id);
  }

  @UseGuards(AuthGuard('jwt_user'))
  @Get()
  async getAllUserFormulaire(@Req() request: Request, @Param('id') id: number): Promise<Formulaire[]> {
    const user = request.user as User;
    return this.formulaireService.findUserFormulaire(user.id);
  }

  @UseGuards(AuthGuard('jwt_admin'))
  @Get('/user/id')
  async getUserFormulaires(@Param('id') id: string): Promise<Formulaire[]> {
    return this.formulaireService.findUserFormulaire(id);
  }
  
  @UseGuards(AuthGuard('jwt_admin'))
  @Get('/admin')
  async findAll(): Promise<Formulaire[]> {
    return this.formulaireService.findAll();
  }

  @UseGuards(AuthGuard('jwt_admin'))
  @Get(':id')
  async findOne(@Param('id') id: number, @Req() request: Request) {
    const user = request.user; // Utilisateur extrait du JWT
    return this.formulaireService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt_admin'))
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
