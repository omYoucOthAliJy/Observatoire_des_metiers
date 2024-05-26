import {
  Entity,
  PrimaryGeneratedColumn,
  Column /*, ManyToOne*/,
} from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  answer: string;

  //   @ManyToOne(() => Formulaire, (formulaire) => formulaire.questions)
  //   formulaire: Formulaire;
}
