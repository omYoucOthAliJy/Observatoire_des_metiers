"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entity/user.entity");
const csv = require("csv-parser");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
let UserService = class UserService {
    constructor(userRepository, entityManager, mailerService) {
        this.userRepository = userRepository;
        this.entityManager = entityManager;
        this.mailerService = mailerService;
    }
    async findAll() {
        const users = await this.userRepository.find();
        return users;
    }
    async findAllByFormation(formation) {
        try {
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
            const users = await this.userRepository.find({
                where: {
                    formation: (0, typeorm_2.ILike)(`%${normalizedFormation}%`),
                },
            });
            return users;
        }
        catch (error) {
            throw error;
        }
    }
    async findAllByFirstLetter(fletter) {
        try {
            const normalized = fletter ? fletter.toLowerCase() : '';
            const users = await this.userRepository
                .createQueryBuilder('user')
                .where('SUBSTRING(user.name, 1, 1) = :firstLetter', {
                firstLetter: normalized.charAt(0),
            })
                .getMany();
            return users;
        }
        catch (error) {
            throw error;
        }
    }
    async findAllByNameStartingWith(startingWith) {
        try {
            const normalizedStartingWith = startingWith
                ? startingWith.toLowerCase()
                : '';
            const users = await this.userRepository
                .createQueryBuilder('user')
                .where('LOWER(user.name) LIKE :startingWith', {
                startingWith: `${normalizedStartingWith}%`,
            })
                .getMany();
            return users;
        }
        catch (error) {
            throw error;
        }
    }
    async findAllByDateDiplome(dateDiplome) {
        try {
            const users = await this.userRepository
                .createQueryBuilder('user')
                .where('user.date_diplome = :dateDiplome', { dateDiplome })
                .getMany();
            return users;
        }
        catch (error) {
            throw error;
        }
    }
    async create(user) {
        const res = await this.userRepository.save(user);
        return res;
    }
    async findById(id) {
        try {
            const user = await this.userRepository.findOne({ where: { id } });
            if (!user) {
                throw new common_1.NotFoundException('User not found.');
            }
            return user;
        }
        catch (error) {
            if (error.name === 'EntityNotFound') {
                throw new common_1.BadRequestException('Enter a correct id.');
            }
            throw error;
        }
    }
    async updateById(id, user) {
        await this.userRepository.update(id, user);
        return await this.userRepository.findOne({ where: { id } });
    }
    async deleteById(id) {
        try {
            const user = await this.userRepository.findOne({ where: { id } });
            if (!user) {
                throw new common_1.NotFoundException('User not found.');
            }
            await this.userRepository.delete(id);
            return 'User deleted successfully.';
        }
        catch (error) {
            throw error;
        }
    }
    async getUsersByCriteria(getUsersDto) {
        try {
            const { page = 1, size = 10, formation, letter, startingWith, dateDiplome, } = getUsersDto;
            const usersQuery = this.userRepository
                .createQueryBuilder('user')
                .skip((page - 1) * size)
                .take(size);
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
            const [users, count] = await usersQuery.getManyAndCount();
            return {
                data: users,
                count,
            };
        }
        catch (error) {
            throw error;
        }
    }
    generateRandomPassword() {
        return crypto.randomBytes(8).toString('hex');
    }
    async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }
    async sendPasswordResetEmail(email, password) {
        await this.mailerService.sendMail({
            to: email,
            subject: 'Your new password',
            template: './reset-password',
            context: { password },
        });
    }
    async uploadCsv(filePath) {
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
            const user = new user_entity_1.User();
            user.name = record.prenom;
            user.gender = record.civilite === 'M' ? 'Male' : 'Female';
            user.email = record.mailPerso;
            user.last_name = record.nom;
            user.birthday = record.dateNaiss;
            user.formation = record.specialite;
            user.date_diplome = record.Anne_Obtention;
            user.description = record.Derniere_Inscription;
            user.password = randomPassword;
            await this.userRepository.save(user);
            await this.sendPasswordResetEmail(record.mailPerso, randomPassword);
        }
        fs.unlinkSync(filePath);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.EntityManager !== "undefined" && typeorm_2.EntityManager) === "function" ? _b : Object, typeof (_c = typeof MailerService !== "undefined" && MailerService) === "function" ? _c : Object])
], UserService);
//# sourceMappingURL=user.service.js.map