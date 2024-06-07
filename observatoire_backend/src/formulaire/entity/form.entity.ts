import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Question } from './question.entity';
import { FormStatus, Contrat } from '../enum'; 


@Entity()
export class Formulaire {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  user_id: number;

  @Column({ type: 'text', nullable: true })
  reponse: string;

  @Column({ type: 'int', nullable: true })
  temps: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Localisation: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  signature: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Entreprise: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Nom_group: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  secteur_activite: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  fonction: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  adresse_entreprise: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Pays: string;

  @Column({ type: 'int', nullable: true })
  code_postal: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  ville: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  courriel_pro: string;

  @Column({ type: 'enum', enum: Contrat, nullable: true })
  type_contrat: Contrat;

  @Column({ type: 'int', nullable: true })
  mois: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  Salair_brut: number;

  @Column({
    type: 'enum',
    enum: FormStatus,
    default: FormStatus.PENDING,
  })
  status: FormStatus;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => Question, (question) => question.formulaires)
  question: Question;
}
