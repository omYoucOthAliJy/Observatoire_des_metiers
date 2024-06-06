import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { EntityManager } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { ConfigService } from '@nestjs/config';

/**
 * Service responsible for handling authentication related operations.
 */
@Injectable()
export class AuthService {
    constructor(
        private readonly entityManager: EntityManager,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    /**
     * Logs in a user.
     * @param loginDto The data required to log in a user.
     * @returns An object containing the JWT token.
     * @throws UnauthorizedException If the provided email or password is invalid.
     */
    async login(loginDto: LoginDto): Promise<{ token: string }> {
        const { email, password } = loginDto;
        
        // Find the user by email
        const user = await this.entityManager.findOneBy(User, { email });

        // If user is not found, throw an exception
        if (!user) {
            throw new UnauthorizedException("Invalid email or password");
        }

        // If user is blocked, throw an exception
        if (user.blocked === true) {
            throw new UnauthorizedException("Access Denied");
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordIsMatched = await bcrypt.compare(password, user.password);

        // If passwords don't match, throw an exception
        if (!passwordIsMatched) {
            throw new UnauthorizedException("Invalid email or password");
        }

        // Generate JWT token with user details
        const token = this.jwtService.sign({
            id: user.id,
            firstname: user.firstName,
            lastname: user.lastName,
            email: user.email,
            formation: user.formation,
            gender: user.gender,
        }, {
            secret: this.configService.get<string>('JWT_SECRET'),
            expiresIn: this.configService.get<string>('JWT_EXPIRE')
        });

        return { token };
    }
}