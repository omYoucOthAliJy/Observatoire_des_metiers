import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import * as mongoose from 'mongoose';
import {Query } from 'express-serve-static-core';

import { identity } from 'rxjs';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>
    ){}

    async findAll(): Promise <User[]> {
        const users = await this.userModel.find();
        return users;
    }

    async findAllByFormation(query: Query): Promise <User[]> {
        // console.log(query)
        // console.log(x.toLocaleLowerCase())
        // console.log(x.normalize('NFD'))
        // console.log(x.replace(/[\u0300-\u036f]/g, ''))
        // console.log(x)
        let regexFormation: RegExp;
        if (typeof query.formation === 'string') {
        const normalizedFormation = query.formation
        ? query.formation
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
            .replace(/[^a-z0-9]/g, '') // Supprimer tous les caractères non alphabétiques
          
        : '';
        console.log(normalizedFormation);
      // Créer l'expression régulière pour la formation
      if (normalizedFormation) {
        regexFormation = new RegExp(normalizedFormation, 'i');
        console.log(regexFormation)
      } else {
        regexFormation = /.*/; // Si la formation n'est pas spécifiée, correspondre à tout
        console.log("2222")

      }
  
      // Requête MongoDB avec la regex pour la formation
      const users = await this.userModel.find({
        formation: { $regex: regexFormation },
      });
        return users;
    }}

    async create(user: User): Promise <User> {
    const res = await this.userModel.create(user);
    return res;
    }

    async findById(id: string): Promise <User> {
        const isValidid= mongoose.isValidObjectId(id);

        try {
            console.log(isValidid)
           
            const user = await this.userModel.findById(id);
            return user;
        } 
            
        catch(error){
            if (!isValidid){
                throw new BadRequestException("Enter a correct id.")
            }
            throw new NotFoundException('User not found.');
        }
        
            
        
        }

        async updateById(id: string, user: User): Promise <User> {
            return await this.userModel.findByIdAndUpdate(id,user,{
                new: true,
                runValidators: true,
            });
          
        
            
            }

        async deleteById(id: string): Promise <User> {
                return await this.userModel.findByIdAndDelete(id);
                
              
            
                
                }
}
