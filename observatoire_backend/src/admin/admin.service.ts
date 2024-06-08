import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from './admin.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AdminService {
    constructor(
        private readonly entityManager: EntityManager,
      ) {}
    
      
      async createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
        try {
          const newAdmin = await this.entityManager.transaction(
            async (entityManager) => {
              let admin = await entityManager.findOneBy(Admin, {email: createAdminDto.email});
    
              if (admin) {
                throw new ConflictException(
                  'A user with that email already exists',
                );
              }
    
              const passwordHash = await this.hashPassword(createAdminDto.password);
              admin = new Admin({
                email: createAdminDto.email,
                firstName: createAdminDto.first_name,
                lastName: createAdminDto.last_name,
                password: passwordHash,
              });
    
              await entityManager.save(admin);
    
              return admin;
            },
          );
    
          return newAdmin;
        } catch (error) {
          throw new BadRequestException('Failed to create admin: ' + error.message);
        }
    }

    private async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
      }
    
}
