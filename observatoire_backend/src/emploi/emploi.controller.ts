import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EmploiService } from './emploi.service';
import { CreateEmploiDto } from './dto/create-emploi-dto';
import { UpdateEmploiDto } from './dto/update-emploi-dto';
import { Emploi } from './entity/emploi.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('emploi')
export class EmploiController {
  constructor(private readonly emploiService: EmploiService) {}

  @UseGuards(AuthGuard('jwt_admin'))
  @Post()
  async createEmploi(
    @Body() createEmploiDto: CreateEmploiDto,
  ): Promise<Emploi> {
    return this.emploiService.create(createEmploiDto);
  }

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('createdAt') createdAt: 'ASC' | 'DESC',
  ): Promise<{data: Emploi[], count: number}> {
    if (createdAt !== 'ASC' && createdAt !== 'DESC') {
      throw new BadRequestException(
        'Le paramètre createdAt doit être "ASC" ou "DESC".',
      );
    }
    return this.emploiService.findAll(page, size, createdAt);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Emploi> {
    return this.emploiService.findOneById(id);
  }

  @UseGuards(AuthGuard('jwt_admin'))
  @Put(':id')
  async updateEmploi(
    @Param('id') id: number,
    @Body() updateEmploiDto: UpdateEmploiDto,
  ): Promise<Emploi> {
    return this.emploiService.update(id, updateEmploiDto);
  }

  @UseGuards(AuthGuard('jwt_admin'))
  @Delete(':id')
  async removeEmploi(@Param('id') id: number): Promise<void> {
    return this.emploiService.remove(id);
  }
}
