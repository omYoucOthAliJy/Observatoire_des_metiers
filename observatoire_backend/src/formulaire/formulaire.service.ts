import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, EntityNotFoundError, Repository } from 'typeorm';
import { Formulaire } from './entity/form.entity';
import { CreateFormulaireDto } from './dto/create-formulaire-dto';
import { UpdateFormulaireDto } from './dto/update-formulaire-dto';
import { FormStatus } from './enum';

@Injectable()
export class FormulaireService {
  constructor(
    @InjectRepository(Formulaire)
    private formulaireRepository: Repository<Formulaire>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(user_id: string, createFormulaireDto: CreateFormulaireDto): Promise<Formulaire> {
    if (createFormulaireDto.status == FormStatus.SUBMIT) {
      if (!this.validateFormulaire(createFormulaireDto)) {
        throw new BadRequestException("all fields are required")
      }
    } 
    const formulaire = new Formulaire({...createFormulaireDto, user_id: user_id});
    await this.formulaireRepository.save(formulaire);

    return formulaire;
  }

  async update(
    user_id: string,
    id: number,
    updateFormulaireDto: UpdateFormulaireDto,
  ): Promise<void> {
    try {
      if (updateFormulaireDto.status == FormStatus.SUBMIT) {
        if (!this.validateFormulaire(updateFormulaireDto)) {
          throw new BadRequestException("all fields are required")
        }
      } 
      const result = await this.entityManager.update(Formulaire, {id, user_id}, updateFormulaireDto);

      if (result.affected < 1) {
        throw new NotFoundException('Formulaire not found');
      }

      return;
    } catch (error) {
      throw error
    }
  }

  async findUserFormulaire(user_id: string): Promise<Formulaire[]> {
    return await this.entityManager.findBy(Formulaire, {user_id});
  }

  async findAll(): Promise<Formulaire[]> {
    return await this.formulaireRepository.find();
  }

  async findOne(id: number): Promise<Formulaire> {
    const formulaire = await this.formulaireRepository.findOneBy({ id });

    if (!formulaire) {
      throw new NotFoundException('Formulaire not found');
    }

    return formulaire;
  }

  

  validateFormulaire(createFormulaireDto: CreateFormulaireDto | UpdateFormulaireDto): boolean {
    return (
      createFormulaireDto.Localisation !== null &&
      createFormulaireDto.signature !== null &&
      createFormulaireDto.Entreprise !== null &&
      createFormulaireDto.Nom_group !== null &&
      createFormulaireDto.secteur_activite !== null &&
      createFormulaireDto.fonction !== null &&
      createFormulaireDto.adresse_entreprise !== null &&
      createFormulaireDto.Pays !== null &&
      createFormulaireDto.code_postal !== null &&
      createFormulaireDto.ville !== null &&
      createFormulaireDto.courriel_pro !== null &&
      createFormulaireDto.type_contrat !== null &&
      createFormulaireDto.mois !== null &&
      createFormulaireDto.Salair_brut !== null
    );
  }

  async remove(user_id: string, id: number): Promise<void> {
    const result = await this.entityManager.delete(Formulaire, {user_id, id});
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
