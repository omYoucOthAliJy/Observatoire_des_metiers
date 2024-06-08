import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FormStatus, Contrat } from '../enum'; 


@Entity()
export class Formulaire {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', nullable: false })
  user_id: string;

  @Column({ type: 'text', nullable: true })
  reponse: string;

  @Column({ type: 'integer', nullable: true })
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

  @Column({ type: 'varchar', nullable: true })
  code_postal: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  ville: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  courriel_pro: string;

  @Column({ type: 'enum', enum: Contrat, nullable: true })
  type_contrat: Contrat;

  @Column({ type: 'integer', nullable: true })
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

  constructor(formulaire: Partial<Formulaire>) {
    Object.assign(this, formulaire);
  }
}
