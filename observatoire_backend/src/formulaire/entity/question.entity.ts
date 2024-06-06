import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Formulaire } from './form.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  valeur: string;

  @OneToMany(() => Formulaire, (formulaire) => formulaire.question)
  formulaires: Formulaire[];
}
