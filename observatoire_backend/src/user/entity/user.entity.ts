import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Question } from './question.entity';
import { GenderEnum } from '../enum/gender.enum';
import { Formation } from './formation.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({
    type: "varchar",
    nullable: false,
  })
  email:string;

  @Column({
    type: "enum",
    enum: GenderEnum,
    nullable: true,
  })
  gender: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  firstName: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  lastName: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  marriedName: string;

  @Column({
    type: "date",
    nullable: true,
  })
  birthDate: Date;

  @Column({
    type: "varchar",
    nullable: true,
  })
  birthPlace: string;

  @Column({
    type: "date",
    nullable: true,
  })
  birthCountry: string;

  @ManyToOne(() => Question, {
    eager: true,
    onDelete: "NO ACTION",
    nullable: null
  })
  formation: Formation;

  @Column({
    type: "date",
    nullable: true,
  })
  date_diplome: Date;

  @Column({
    type: "varchar",
    nullable: true,
  })
  address: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  zipCode: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  city: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  country: string;

  @ManyToOne(() => Question, {
    eager: true,
    onDelete: "NO ACTION",
    nullable: null
  })
  question: Question;

  @Column({
    type: "varchar",
    nullable: true,
  })
  answer: string;

  @Exclude()
  @Column({
    type: "varchar",
    nullable: false,
  })
  password: string;


  @Column({
    type: "boolean",
    nullable: false,
    default: false
  })
  blocked: boolean;

  constructor(user: Partial<User>) {
    Object.assign(this, user);
}
}
