import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Column()
  email:string;

  @IsNotEmpty()
  @IsString()
  @Column()
  gender:string;

  @IsNotEmpty()
  @IsString()
  @Column()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  last_name: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  birthday: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  formation: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  date_diplome: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  description: string;
}
