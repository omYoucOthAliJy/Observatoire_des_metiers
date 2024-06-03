import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Formation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
}
