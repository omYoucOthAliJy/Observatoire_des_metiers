import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm';
import { Question } from './question.entity';
import { GenderEnum } from '../enum/gender.enum';
import { Formation } from './formation.entity';
import { Exclude } from 'class-transformer';
import { Speciality } from './speciality.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column({
      type: "varchar",
      nullable: true,
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
    type: "varchar",
    nullable: true,
  })
  birthDate: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  birthPlace: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  birthCountry: string;

  @ManyToOne(() => Formation, {
    eager: true,
    onDelete: "NO ACTION",
    nullable: true
  })
  formation: Formation;

  @ManyToOne(() => Speciality, {
    eager: true,
    onDelete: "NO ACTION",
    nullable: true
  })
  speciality: Speciality;

  @Column({
    type: "varchar",
    nullable: true,
  })
  date_diplome: string;

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
    nullable: true,
  })
  password: string;


  @Column({
    type: "boolean",
    nullable: false,
    default: false
  })
  blocked: boolean;

  @Column({
    type: "boolean",
    nullable: false,
    default: true
  })
  firstConnection: boolean;

  constructor(user: Partial<User>) {
    Object.assign(this, user);
}
}