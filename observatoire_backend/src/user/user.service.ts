import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager, EntityNotFoundError } from 'typeorm';
import { User } from './entity/user.entity';

import { CreateUserDto } from './dto/create-user-dto';
import { GetUsersDto } from './dto/get-user-dto';
import * as fs from 'fs';

import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { MailerService } from '@nestjs-modules/mailer';
import { Formation } from './entity/formation.entity';
import { UserEntry } from 'src/utils/parser/user.entry';
import { CSVParserService } from 'src/utils/parser/csv-parser.service';
import { Speciality } from './entity/speciality.entity';
import { IdentifyUserDto } from './dto/identify-user.dto';
import { Question } from './entity/question.entity';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly entityManager: EntityManager,
    private mailerService: MailerService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      let user = await this.entityManager.findOneBy(User, {email: createUserDto.email});

      if (user) {
        throw new ConflictException('user with that email already exists');
      }
      
      const password = this.generateRandomPassword();
      console.log(password)
      const passwordHash = await  this.hashPassword(password);
      user = new User({
        email: createUserDto.email,
        password: passwordHash
      })

      await this.entityManager.save(user);

      //await this.sendPasswordResetEmail(createUserDto.email, password);

      return user;
    } catch(error) {
      throw error;
    }
  }

  async identifyUser(email: string, identifyUserDto: IdentifyUserDto): Promise<User> {
    try {
      const newUser = await this.entityManager.transaction(async (entityManager) => {
        const formation = await entityManager.findOneByOrFail(Formation, {
          id: identifyUserDto.formationId,
        });

        const speciality = await entityManager.findOneByOrFail(Speciality, {
          id: identifyUserDto.specialityId,
        });

        const question = await entityManager.findOneByOrFail(Question, {
          id: identifyUserDto.questionId,
        });
        
        let user = await entityManager.findOneByOrFail(User, {
          firstName: this.capitalizeFirstLetter(identifyUserDto.firstName.toLowerCase()),
          lastName: this.capitalizeFirstLetter(identifyUserDto.lastName.toLowerCase()),
          formation: formation,
          speciality: speciality,
          birthDate: identifyUserDto.birthDate,
          gender: identifyUserDto.gender,
          firstConnection: true,
        });
  
        let connectionUser = await entityManager.findOneByOrFail(User,{
          email: email,
          firstConnection: true,
        })
  
        if (!user || !formation) {
          throw new NotFoundException('No User With those Specifications');
        }
  
        if (!connectionUser) {
          throw new NotFoundException('User not found');
        }
  
        user.email = email;
        user.password = connectionUser.password;
        user.firstName = identifyUserDto.firstName;
        user.lastName = identifyUserDto.lastName;
        if (identifyUserDto.marriedName) user.marriedName = identifyUserDto.marriedName;
        user.birthDate = identifyUserDto.birthDate;
        user.birthPlace = identifyUserDto.birthPlace;
        user.birthCountry = identifyUserDto.birthCountry;
        user.address = identifyUserDto.address;
        user.zipCode = identifyUserDto.zipCode;
        user.city = identifyUserDto.city;
        user.country = identifyUserDto.country;
        user.question = question;
        user.answer = identifyUserDto.answer;
        user.formation = formation;
        user.speciality = speciality;
        user.date_diplome = identifyUserDto.date_diplome;
        user.gender = identifyUserDto.gender;
        user.firstConnection = false;
  
        await entityManager.save(user);
        await entityManager.delete(User, {id: connectionUser.id});

        return user;
      });
    
      return newUser;
    } catch(error) {
      if (error instanceof EntityNotFoundError) {
        throw new BadRequestException(error.message)
      }
      throw error;
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

  private generateRandomPassword(): string {
    return crypto.randomBytes(8).toString('hex'); // Generates a 16-character random password
  }
  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
  async sendPasswordResetEmail(email: string, password: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Your new password',
      template: './reset-password', // The name of the template file
      context: { password }, // The context to pass to the template
    });
  }


  async uploadCsv(file: Express.Multer.File): Promise<void> {
    try {
      await this.entityManager.transaction(async (entityManager) => {
        const csvParser = CSVParserService.getInstance();
        const specialities = await entityManager.find(Speciality);
        const formations = await entityManager.find(Formation);
        const userEntries: UserEntry[] = await csvParser.parse(file, specialities, formations);

        let user;
        let speciality;
        let formation;
        let existsUser;

        for (let item of userEntries) {
          speciality = await entityManager.findOneByOrFail(Speciality, {title: item.speciality});
          formation = await entityManager.findOneByOrFail(Formation, {title: item.formation})
          existsUser = await entityManager.findOneBy(User,{
            ...item, 
            firstName: this.capitalizeFirstLetter(item.firstName.toLowerCase()),
            lastName:  this.capitalizeFirstLetter(item.lastName.toLowerCase()),
            speciality,
            formation,
            gender: item.gender == "M" ? "MALE": item.gender == "F" ? "FEMALE": null,
          });

          if(existsUser != null) {
            throw new BadRequestException("A User in the file already exists");
          }
          console.log(item)
          user = new User({
            ...item, 
            speciality,
            formation,
            gender: item.gender == "M" ? "MALE": item.gender == "F" ? "FEMALE": null,
          });

          await entityManager.save(user);
        }

        return
      });
      
      return;
    } catch (error) {
      // Log the error or handle it as needed
      console.error('Error uploading CSV:', error);
      if (error instanceof EntityNotFoundError || error instanceof BadRequestException ) {
        throw new BadRequestException(error.message)
      }

      throw new Error('Failed to upload CSV');
    }
  }  

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
}
