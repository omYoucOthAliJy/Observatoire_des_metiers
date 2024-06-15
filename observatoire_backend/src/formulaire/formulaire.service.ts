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

  /**
   * Create a new Formulaire.
   * @param user_id - ID of the user creating the formulaire.
   * @param createFormulaireDto - Data Transfer Object containing formulaire details.
   * @returns The created Formulaire entity.
   * @throws BadRequestException if required fields are missing when status is SUBMIT.
   */
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

  /**
   * Update an existing Formulaire.
   * @param user_id - ID of the user updating the formulaire.
   * @param id - ID of the formulaire to update.
   * @param updateFormulaireDto - Data Transfer Object containing updated formulaire details.
   * @throws BadRequestException if required fields are missing when status is SUBMIT.
   * @throws NotFoundException if the formulaire is not found.
   */
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

  /**
   * Find all Formulaires for a given user.
   * @param user_id - ID of the user.
   * @returns An array of Formulaires.
   */
  async findUserFormulaire(user_id: string, onlySubmited): Promise<Formulaire[]> {
    let formulaires;
    if (onlySubmited) {
      formulaires = await this.entityManager.findBy(Formulaire, {user_id, status: FormStatus.SUBMIT})
    } else {
      formulaires = await this.entityManager.findBy(Formulaire, {user_id})
    }
    return formulaires;
  }

  /**
   * Find all Formulaires.
   * @returns An array of all Formulaires.
   */
  async findAll(): Promise<Formulaire[]> {
    return await this.formulaireRepository.find();
  }

  /**
   * Find a specific Formulaire by user and ID.
   * @param user_id - ID of the user.
   * @param id - ID of the formulaire.
   * @returns The found Formulaire.
   * @throws NotFoundException if the formulaire is not found.
   */
  async findOneByUser(user_id: string, id: number): Promise<Formulaire> {
    const formulaire = await this.formulaireRepository.findOneBy({ id, user_id });

    if (!formulaire) {
      throw new NotFoundException('Formulaire not found');
    }

    return formulaire;
  }

  /**
   * Find a specific Formulaire by ID.
   * @param id - ID of the formulaire.
   * @returns The found Formulaire.
   * @throws NotFoundException if the formulaire is not found.
   */
  async findOne(id: number): Promise<Formulaire> {
    const formulaire = await this.formulaireRepository.findOneBy({ id });

    if (!formulaire) {
      throw new NotFoundException('Formulaire not found');
    }

    return formulaire;
  }

  /**
   * Validate the fields of a Formulaire.
   * @param formulaireDto - Data Transfer Object containing formulaire details.
   * @returns True if all required fields are present, false otherwise.
   */
  validateFormulaire(formulaireDto: CreateFormulaireDto | UpdateFormulaireDto): boolean {
    return (
      formulaireDto.localisation !== null &&
      formulaireDto.embauche_cadre !== null &&
      formulaireDto.nom_group !== null &&
      formulaireDto.secteur_activite !== null &&
      formulaireDto.fonction !== null &&
      formulaireDto.adresse_entreprise !== null &&
      formulaireDto.pays !== null &&
      formulaireDto.code_postal !== null &&
      formulaireDto.ville !== null &&
      formulaireDto.courriel_pro !== null &&
      formulaireDto.type_contrat !== null &&
      ((formulaireDto.type_contrat == "CDD" && formulaireDto.mois !== null) || formulaireDto.type_contrat == "CDI") &&
      formulaireDto.salair_brut !== null
    );
  }

  /**
   * Remove a Formulaire by user and ID.
   * @param user_id - ID of the user.
   * @param id - ID of the formulaire.
   * @throws NotFoundException if the formulaire is not found.
   */
  async remove(user_id: string, id: number): Promise<void> {
    const result = await this.entityManager.delete(Formulaire, {user_id, id});
    if (result.affected === 0) {
      throw new NotFoundException('Formulaire not found');
    }
  }

  /**
   * Export a Formulaire to CSV format.
   * @param id - ID of the formulaire.
   * @returns A string containing the formulaire data in CSV format.
   * @throws BadRequestException if the formulaire is not in SUBMIT status.
   */
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
      Temps: formulaire.temps,
      Localisation: formulaire.localisation,
      Entreprise: formulaire.entreprise,
      'Nom du groupe': formulaire.nom_group,
      "Secteur d'activité": formulaire.secteur_activite,
      Fonction: formulaire.fonction,
      'Adresse entreprise': formulaire.adresse_entreprise,
      Pays: formulaire.pays,
      'Code postal': formulaire.code_postal,
      Ville: formulaire.ville,
      'Courriel professionnel': formulaire.courriel_pro,
      'Type de contrat': formulaire.type_contrat,
      Mois: formulaire.mois || "NULL",
      'Salaire brut': formulaire.salair_brut,
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
