import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
//import { User } from './schema/user.schema';
import{InjectRepository} from '@nestjs/typeorm';
import{ILike, Repository} from 'typeorm';
import { User } from './user.entity';


import { identity } from 'rxjs';
import { CreateUserDto } from './dto/create-user-dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    async findAll(): Promise <User[]> {
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
    

    async create(user: CreateUserDto): Promise <User> {
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
    
}

