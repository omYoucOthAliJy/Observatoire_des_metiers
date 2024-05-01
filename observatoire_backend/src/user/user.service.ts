import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager, EntityNotFoundError } from 'typeorm';
import { User } from './entity/user.entity'; // conflict
import { CreateUserDto } from './dto/create-user-dto';
import { GetUsersDto } from './dto/get-user-dto';

import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { MailerService } from '@nestjs-modules/mailer';
import { Formation } from './entity/formation.entity';
import { UserEntry } from 'src/utils/parser/user.entry';
import { CSVParserService } from 'src/utils/parser/csv-parser.service';
import { Speciality } from './entity/speciality.entity';
import { IdentifyUserDto } from './dto/identify-user.dto';
import { Question } from './entity/question.entity';
import { GetUserByEmailDto } from './dto/get_user_by_email.dto';
import { UserForgotPasswordDto } from './dto/user-forgot-password.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly mailerService: MailerService,
  ) {}

  /**
   * Creates a new user.
   * @param createUserDto - The DTO containing user creation details.
   * @returns The created user.
   * @throws ConflictException if a user with the provided email already exists.
   */
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {

      const newUser = await this.entityManager.transaction(async (entityManager) => {
        
        let user = await entityManager.findOneBy(User, { email: createUserDto.email });

        if (user) {
          throw new ConflictException('A user with that email already exists');
        }
        
        const password = this.generateRandomPassword();
        const passwordHash = await this.hashPassword(password);
        user = new User({
          email: createUserDto.email,
          password: passwordHash
        });

        await entityManager.save(user);

        await this.sendPasswordResetEmail(createUserDto.email, password);

        return user;
      })

      return newUser;
    } catch (error) {
      throw new BadRequestException('Failed to create user: ' + error.message);
    }
  }

  /**
   * Identifies and updates a user based on the provided details.
   * @param email - The email of the user.
   * @param identifyUserDto - The DTO containing identification details.
   * @returns The updated user.
   * @throws NotFoundException if the user or other entities are not found.
   * @throws BadRequestException if the request is invalid.
   */
  async identifyUser(email: string, identifyUserDto: IdentifyUserDto): Promise<User> {
    try {
      const newUser = await this.entityManager.transaction(async (entityManager) => {
        const formation = await entityManager.findOneByOrFail(Formation, { id: identifyUserDto.formationId });
        const speciality = await entityManager.findOneByOrFail(Speciality, { id: identifyUserDto.specialityId });
        const question = await entityManager.findOneByOrFail(Question, { id: identifyUserDto.questionId });
        
        let user = await entityManager.findOneByOrFail(User, {
          firstName: this.capitalizeFirstLetter(identifyUserDto.firstName.toLowerCase()),
          lastName: this.capitalizeFirstLetter(identifyUserDto.lastName.toLowerCase()),
          formation: formation,
          speciality: speciality,
          birthDate: identifyUserDto.birthDate,
          gender: identifyUserDto.gender,
          firstConnection: true,
        });

        let connectionUser = await entityManager.findOneByOrFail(User, {
          email: email,
          firstConnection: true,
        });

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
        await entityManager.delete(User, { id: connectionUser.id });

        return user;
      });

      return newUser;
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('User or related entity not found: ' + error.message);
      }
      throw new BadRequestException('Failed to identify user: ' + error.message);
    }
  }

  /**
   * Fetches users based on given criteria.
   * @param getUsersDto - The DTO containing user search criteria.
   * @returns A list of users and the total count.
   * @throws BadRequestException if the request is invalid.
   */
  async getUsersByCriteria(
    getUsersDto: GetUsersDto,
  ): Promise<{ data: User[]; count: number }> {
    try {
      const {
        page = 1,
        size = 10,

        // Filters
        name,
        formation,
        speciality,
        date_diplome,

        // Sorting
        name_sort,
        date_diplome_sort,
        formation_sort,
        speciality_sort,
      } = getUsersDto;

      let usersQuery = this.entityManager
        .getRepository(User)
        .createQueryBuilder("user")
        .innerJoinAndSelect("user.formation", "formation")
        .innerJoinAndSelect("user.speciality", "speciality")
        .skip((page - 1) * size)
        .take(size);

      if (name_sort !== undefined) {
        usersQuery.orderBy("user.firstName", name_sort)
                  .addOrderBy("user.lastName", name_sort);
      }
      if (date_diplome_sort !== undefined) usersQuery.orderBy("user.date_diplome", date_diplome_sort);
      if (formation_sort !== undefined) usersQuery.orderBy("user.formation", formation_sort);
      if (speciality_sort !== undefined) usersQuery.orderBy("user.speciality", speciality_sort);

      if (name !== undefined) {
        usersQuery = usersQuery.andWhere("CONCAT(firstName, ' ', lastName) LIKE :name", { name: `${name}%` });
      }

      if (formation !== undefined) {
        usersQuery = usersQuery.andWhere('formation.title LIKE :formation', { formation: `${formation}%` });
      }

      if (speciality !== undefined) {
        usersQuery = usersQuery.andWhere('speciality.title LIKE :speciality', { speciality: `${speciality}%` });
      }

      if (date_diplome !== undefined) {
        usersQuery = usersQuery.andWhere('date_diplome LIKE :dateDiplome', { dateDiplome: `%${date_diplome}%` });
      }

      const [users, count] = await usersQuery.getManyAndCount();

      return {
        data: users,
        count,
      };
    } catch (error) {
      throw new BadRequestException('Failed to fetch users: ' + error.message);
    }
  }

  /**
   * Fetches a user by their ID.
   * @param id - The ID of the user.
   * @returns The user entity.
   * @throws NotFoundException if the user is not found.
   * @throws BadRequestException if the request is invalid.
   */
  async getUserById(id: string): Promise<User> {
    try {
      const user = await this.entityManager.findOneOrFail(User, {
        where: { id },
        relations: {
          formation: true,
          speciality: true,
        }
      });
      return user;
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('User not found: ' + error.message);
      }
      throw new BadRequestException('Failed to fetch user: ' + error.message);
    }
  }

  /**
   * Fetches a user by their email.
   * @param getUserByEmailDto - The DTO containing the user's email.
   * @returns The user entity.
   * @throws NotFoundException if the user is not found.
   * @throws BadRequestException if the request is invalid.
   */
  async getUserByEmail(getUserByEmailDto: GetUserByEmailDto): Promise<User> {
    try {
      const user = await this.entityManager.findOneOrFail(User, {
        where: { email: getUserByEmailDto.email },
        relations: {
          formation: true,
          speciality: true,
        }
      });
      return user;
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('User not found: ' + error.message);
      }
      throw new BadRequestException('Failed to fetch user: ' + error.message);
    }
  }

  /**
   * Resets the password for a user who forgot their password.
   * @param userForgotPasswordDto - The DTO containing the user's email and security question answer.
   * @throws BadRequestException if the provided answer is incorrect or the request is invalid.
   */
  async userForgotPassword(userForgotPasswordDto: UserForgotPasswordDto): Promise<void> {
    try {
      await this.entityManager.transaction(async (entityManager) => {
        const user = await entityManager.findOneOrFail(User, {
          where: {
            email: userForgotPasswordDto.email,
            question: { id: userForgotPasswordDto.questionId }
          },
          relations: {
            formation: true,
            speciality: true,
          }
        });

        if (user.answer !== userForgotPasswordDto.answer) {
          throw new BadRequestException("The provided answer is incorrect");
        }

        const password = this.generateRandomPassword();
        const passwordHash = await this.hashPassword(password);
        user.password = passwordHash;

        await entityManager.save(user);

        await this.sendPasswordResetEmail(user.email, password, user.firstName, user.lastName);
      });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('User not found or invalid security question: ' + error.message);
      }
      throw new BadRequestException('Failed to reset password: ' + error.message);
    }
  }


  /**
   * Updates the current user's password.
   * @param {string} id - The ID of the user whose password is to be updated.
   * @param {UpdateUserPasswordDto} updateUserPasswordDto - An object containing the current password and the new password.
   * @returns {Promise<void>} A promise that resolves when the password has been successfully updated.
   * @throws {BadRequestException} If the current password is incorrect or the user is not found.
   * @throws {Error} For any other errors encountered during the process.
   */
  async updateCurrentUserPassword(
    id: string, 
    updateUserPasswordDto: UpdateUserPasswordDto
  ): Promise<void> {
    try {
        const { currentPassword, newPassword } = updateUserPasswordDto;
        let user: User;

        await this.entityManager.transaction(async (entityManager) => {
            user = await entityManager.findOneByOrFail(User, { id });

            if (!bcrypt.compareSync(currentPassword, user.password)) {
                throw new BadRequestException('Current password is incorrect.');
            }

            const passwordHash = await this.hashPassword(newPassword);
            user.password = passwordHash;

            await entityManager.save(user);
        });

        return;
    } catch (error) {
        // Handle case where entity not found (e.g., user not found)
        if (error instanceof EntityNotFoundError) {
            throw new BadRequestException('User not found.');
        }

        // Rethrow any other errors
        throw error;
    }
  }


  /**
   * Sends a password reset email.
   * @param email - The email of the user.
   * @param password - The new password.
   * @param firstName - The user first name.
   * @param lastName - The user last name.
   */
  async sendPasswordResetEmail(email: string, password: string, firstName?: string, lastName?: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Your new password',
      template: './reset-password', // The name of the template file
      context: { password, firstName, lastName }, // The context to pass to the template
    });
  }

  /**
   * Uploads and processes a CSV file to create users.
   * @param file - The CSV file.
   * @throws BadRequestException if a user in the file already exists or other validation fails.
   * @throws Error if the CSV upload fails.
   */
  async uploadCsv(file: Express.Multer.File): Promise<void> {
    try {
      await this.entityManager.transaction(async (entityManager) => {
        const csvParser = CSVParserService.getInstance();
        const specialities = await entityManager.find(Speciality);
        const formations = await entityManager.find(Formation);
        const userEntries: UserEntry[] = await csvParser.parse(file, specialities, formations);

        for (let item of userEntries) {
          const speciality = await entityManager.findOneByOrFail(Speciality, { title: item.speciality });
          const formation = await entityManager.findOneByOrFail(Formation, { title: item.formation });
          const existsUser = await entityManager.findOneBy(User, {
            ...item,
            firstName: this.capitalizeFirstLetter(item.firstName.toLowerCase()),
            lastName: this.capitalizeFirstLetter(item.lastName.toLowerCase()),
            speciality,
            formation,
            gender: item.gender == "M" ? "MALE" : item.gender == "F" ? "FEMALE" : null,
          });

          if (existsUser != null) {
            throw new BadRequestException("A user in the file already exists");
          }

          const user = new User({
            ...item,
            speciality,
            formation,
            gender: item.gender == "M" ? "MALE" : item.gender == "F" ? "FEMALE" : null,
          });

          await entityManager.save(user);
        }
      });
    } catch (error) {
      console.error('Error uploading CSV:', error);
      if (error instanceof EntityNotFoundError || error instanceof BadRequestException) {
        throw new BadRequestException('CSV upload failed: ' + error.message);
      }

      throw new Error('Failed to upload CSV: ' + error.message);
    }
  }

  /**
   * Generates a random password.
   * @returns A random 16-character password.
   */
  private generateRandomPassword(): string {
    return crypto.randomBytes(8).toString('hex');
  }

  /**
   * Hashes a password using bcrypt.
   * @param password - The password to hash.
   * @returns The hashed password.
   */
  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  /**
   * Capitalizes the first letter of a string.
   * @param string - The string to capitalize.
   * @returns The string with the first letter capitalized.
   */
  private capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
