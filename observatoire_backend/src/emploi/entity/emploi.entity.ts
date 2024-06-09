import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Emploi {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  titre: string;

  @Column('text')
  description: string;

  @Column({ type: 'varchar', length: 255 })
  entreprise: string;

  @Column({ type: 'varchar', length: 255 })
  lieu: string;

  @Column({ length: 50 })
  type_contrat?: string;

  @Column('decimal', { precision: 10, scale: 2 })
  salaire?: number;

  @Column({ type: 'varchar', length: 255 })
  contact_email: string;

  @Column({ length: 20 })
  contact_telephone?: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
