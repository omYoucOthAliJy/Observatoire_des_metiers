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
}
