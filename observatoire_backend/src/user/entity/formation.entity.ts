import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Formation {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  title: string;
}
