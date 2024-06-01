import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

//import { Question } from './question.entity';

@Entity()
export class Formulaire {
  @PrimaryGeneratedColumn()
  id: number;

  @Column(IsNotEmpty)
  user_id: number;

  //nb mois  pour trouver l'emploie
  @Column({ nullable: true })
  temps: number;

  @Column({ nullable: true })
  Localisation: string;

  // Embaucher en tant que cadre
  @Column({ nullable: true })
  signature: string;

  // Embaucher en tant que cadre
  @Column({ nullable: true })
  Entreprise: string;

  // Embaucher en tant que cadre
  @Column({ nullable: true })
  Nom_group: string;

  // Embaucher en tant que cadre
  @Column({ nullable: true })
  secteur_activite: string;

  @Column({ nullable: true })
  fonction: string;

  @Column({ nullable: true })
  adresse_entreprise: string;

  @Column({ nullable: true })
  Pays: string;

  @Column({ nullable: true })
  code_postal: number;

  @Column({ nullable: true })
  ville: string;

  @Column({ nullable: true })
  courriel_pro: string;

  @Column({ nullable: true })
  type_contrat: string;

  // Si CDD
  @Column({ nullable: true })
  mois: number;

  @Column({ nullable: true })
  Salair_brut: number;

  @Column()
  status: string;

  //   @OneToMany(() => Question, (question) => question.formulaire, {
  //     cascade: true,
  //   })
  //   questions: Question[];
}
