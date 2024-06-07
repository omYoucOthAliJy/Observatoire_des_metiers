import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Formulaire } from './entity/form.entity';
import { CreateFormulaireDto } from './dto/create-formulaire-dto';
import { UpdateFormulaireDto } from './dto/update-formulaire-dto';
import { FormStatus } from './enum';
import * as csvParser from 'csv-parser';
import * as fs from 'fs';

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
    return await this.formulaireRepository.find({ relations: ['question'] });
  }

  /*VERIFIE L'UTILISATEUR EN UTLISANT*/
  async findOne(id: number, user?: any): Promise<Formulaire> {
    const formulaire = await this.formulaireRepository.findOneBy({ id });

    if (!formulaire) {
      throw new NotFoundException('Formulaire not found');
    }

    if (user && !user.isAdmin && formulaire.user_id !== user.id) {
      throw new UnauthorizedException(
        'You are not authorized to access this formulaire',
      );
    }

    return formulaire;
  }

  // async findOne(id: number): Promise<Formulaire> {
  //   const formulaire = await this.formulaireRepository.findOneBy({ id });
  //   if (!formulaire) {
  //     throw new NotFoundException('Formulaire not found');
  //   }
  //   return formulaire;
  // }

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

  async exportToCsv(id: number): Promise<string> {
    const formulaire: Formulaire = await this.findOne(id);

    // Vérifier si le formulaire est rempli
    if (formulaire.status !== FormStatus.SUBMIT) {
      throw new BadRequestException(
        "ERROR 404: Le formulaire n'est pas rempli",
      );
    }

    // Convertir les données du formulaire en objet
    const formData = {
      ID: formulaire.id,
      'User ID': formulaire.user_id,
      Réponse: formulaire.reponse,
      Question: formulaire.question,
      Temps: formulaire.temps,
      Localisation: formulaire.Localisation,
      Signature: formulaire.signature,
      Entreprise: formulaire.Entreprise,
      'Nom du groupe': formulaire.Nom_group,
      "Secteur d'activité": formulaire.secteur_activite,
      Fonction: formulaire.fonction,
      'Adresse entreprise': formulaire.adresse_entreprise,
      Pays: formulaire.Pays,
      'Code postal': formulaire.code_postal,
      Ville: formulaire.ville,
      'Courriel professionnel': formulaire.courriel_pro,
      'Type de contrat': formulaire.type_contrat,
      Mois: formulaire.mois,
      'Salaire brut': formulaire.Salair_brut,
      Statut: formulaire.status,
      'Créé le': formulaire.createdAt,
      'Mis à jour le': formulaire.updatedAt,
    };

    // Créer un tableau pour stocker les données CSV
    const csvData = [Object.keys(formData), Object.values(formData)];

    // Générer le CSV à partir des données
    return csvData.map((data) => data.join(',')).join('\n');
  }
}
