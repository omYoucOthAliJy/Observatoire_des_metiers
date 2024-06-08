import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Speciality {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  title: string;
}