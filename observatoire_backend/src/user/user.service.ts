import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
//import { User } from './schema/user.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository, EntityManager } from 'typeorm';
import { User } from './entity/user.entity';

import { identity } from 'rxjs';
import { CreateUserDto } from './dto/create-user-dto';
import { GetUsersDto } from './dto/get-user-dto';

import * as csv from 'csv-parser';
import * as fs from 'fs';

import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

import { mailOptions, transporter } from "../../config/nodemailer";


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async findAllByFormation(formation: string): Promise<User[]> {
    try {
      // Normalization of the formation, only lowcase
      const normalizedFormation = formation
        ? formation
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[àáâãäå]/g, 'a')
            .replace(/[ç]/g, 'c')
            .replace(/[èéêë]/g, 'e')
            .replace(/[ìíîï]/g, 'i')
            .replace(/[ñ]/g, 'n')
            .replace(/[òóôõö]/g, 'o')
            .replace(/[ùúûü]/g, 'u')
            .replace(/[ýÿ]/g, 'y')
            .replace(/[^a-z0-9]/g, '')
        : '';

      // Recherche des utilisateurs par formation
      const users = await this.userRepository.find({
        where: {
          formation: ILike(`%${normalizedFormation}%`),
        },
      });

      return users;
    } catch (error) {
      throw error;
    }
  }

  async findAllByFirstLetter(fletter: string): Promise<User[]> {
    try {
      // Normalization de la formation, en minuscules
      const normalized = fletter ? fletter.toLowerCase() : '';

      // Recherche des utilisateurs par formation
      const users = await this.userRepository
        .createQueryBuilder('user')
        .where('SUBSTRING(user.name, 1, 1) = :firstLetter', {
          firstLetter: normalized.charAt(0),
        })
        .getMany();

      return users;
    } catch (error) {
      throw error;
    }
  }

  async findAllByNameStartingWith(startingWith: string): Promise<User[]> {
    try {
      // Normalisation de la sous-chaîne, en minuscules
      const normalizedStartingWith = startingWith
        ? startingWith.toLowerCase()
        : '';

      // Recherche des utilisateurs dont le nom commence par la sous-chaîne spécifiée
      const users = await this.userRepository
        .createQueryBuilder('user')
        .where('LOWER(user.name) LIKE :startingWith', {
          startingWith: `${normalizedStartingWith}%`,
        })
        .getMany();

      return users;
    } catch (error) {
      throw error;
    }
  }

  async findAllByDateDiplome(dateDiplome: string): Promise<User[]> {
    try {
      // Recherche des utilisateurs par date de diplôme
      const users = await this.userRepository
        .createQueryBuilder('user')
        .where('user.date_diplome = :dateDiplome', { dateDiplome })
        .getMany();

      return users;
    } catch (error) {
      throw error;
    }
  }

  async create(user: CreateUserDto): Promise<User> {
    const res = await this.userRepository.save(user);
    return res;
  }

  async findById(id): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException('User not found.');
      }
      return user;
    } catch (error) {
      if (error.name === 'EntityNotFound') {
        throw new BadRequestException('Enter a correct id.');
      }
      throw error;
    }
  }

  async updateById(id: number, user: User): Promise<User | undefined> {
    await this.userRepository.update(id, user);
    return await this.userRepository.findOne({ where: { id } });
  }

  async deleteById(id: number): Promise<string> {
    try {
      // Vérifier si l'utilisateur existe
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException('User not found.');
      }

      // Supprimer l'utilisateur
      await this.userRepository.delete(id);

      // Retourner un message de succès
      return 'User deleted successfully.';
    } catch (error) {
      throw error; // Répétez l'erreur
    }
  }

  async getUsersByCriteria(
    getUsersDto: GetUsersDto,
  ): Promise<{ data: User[]; count: number }> {
    // this.logger.log('Fetching users by criteria', JSON.stringify(getUsersDto));
    try {
      const {
        page = 1,
        size = 10,
        formation,
        letter,
        startingWith,
        dateDiplome,
      } = getUsersDto;

      // Initialize the query builder
      const usersQuery = this.userRepository
        .createQueryBuilder('user')
        .skip((page - 1) * size)
        .take(size);

      // Apply filters
      if (formation) {
        usersQuery.andWhere('user.formation = :formation', { formation });
      }

      if (letter) {
        usersQuery.andWhere('user.name LIKE :letter', { letter: `${letter}%` });
      }

      if (startingWith) {
        usersQuery.andWhere('user.name LIKE :startingWith', {
          startingWith: `${startingWith}%`,
        });
      }

      if (dateDiplome) {
        usersQuery.andWhere('user.dateDiplome = :dateDiplome', { dateDiplome });
      }

      // Execute the query
      const [users, count] = await usersQuery.getManyAndCount();

      //this.logger.log(`Found ${count} users matching criteria`);

      return {
        data: users,
        count,
      };
    } catch (error) {
      //this.logger.error('Error fetching users by criteria', error.stack);
      throw error;
    }
  }


  private generateEmailContent = (data) => {
    const stringData = "Your new password is " + data;
  
    return {
      text: stringData,
      html: `<!DOCTYPE html><html> <head> <title></title> <meta charset="utf-8"/> <meta name="viewport" content="width=device-width, initial-scale=1"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> <style type="text/css"> body, table, td, a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}table{border-collapse: collapse !important;}body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important;}@media screen and (max-width: 525px){.wrapper{width: 100% !important; max-width: 100% !important;}.responsive-table{width: 100% !important;}.padding{padding: 10px 5% 15px 5% !important;}.section-padding{padding: 0 15px 50px 15px !important;}}.form-container{margin-bottom: 24px; padding: 20px; border: 1px dashed #ccc;}.form-heading{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 400; text-align: left; line-height: 20px; font-size: 18px; margin: 0 0 8px; padding: 0;}.form-answer{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 300; text-align: left; line-height: 20px; font-size: 16px; margin: 0 0 24px; padding: 0;}div[style*="margin: 16px 0;"]{margin: 0 !important;}</style> </head> <body style="margin: 0 !important; padding: 0 !important; background: #fff"> <div style=" display: none; font-size: 1px; color: #fefefe; line-height: 1px;  max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; " ></div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td bgcolor="#ffffff" align="center" style="padding: 10px 15px 30px 15px" class="section-padding" > <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px" class="responsive-table" > <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0" > <tr> <td style=" padding: 0 0 0 0; font-size: 16px; line-height: 25px; color: #232323; " class="padding message-content" > <h2>New Contact Message</h2> <div class="form-container">${htmlData}</div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </body></html>`,
    };
  };

  private generateRandomPassword(): string {
    return crypto.randomBytes(8).toString('hex'); // Generates a 16-character random password
  }
  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
  async sendPasswordResetEmail(email: string, password: string) {
    try {
      await transporter.sendMail({
        ...mailOptions,
        ...this.generateEmailContent(password),
        subject: 'Your new password',
      }); 
    }catch (err) {
        console.log(err);;
      };
  }

  async uploadCsv(filePath: string): Promise<void> {
    const results = [];

    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', resolve)
        .on('error', reject);
    });

    for (const record of results) {
      const randomPassword = this.generateRandomPassword();
      const hashedPassword = await this.hashPassword(randomPassword);
      const user = new User();
      user.name = record.prenom;
      user.gender = record.civilite === 'M' ? 'Male' : 'Female';
      user.email = record.mailPerso;
      user.last_name = record.nom;
      user.birthday = record.dateNaiss;
      user.formation = record.specialite;
      user.date_diplome = record.diplôme;
      user.description = record.Derniere_Inscription;
      user.password = hashedPassword;

      await this.userRepository.save(user);
      await this.sendPasswordResetEmail(record.mailPerso, randomPassword);
    }

    fs.unlinkSync(filePath); // Clean up uploaded file
  }
}


