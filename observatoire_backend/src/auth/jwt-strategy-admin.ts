import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Admin } from "src/admin/admin.entity";
import { EntityManager } from "typeorm";

@Injectable()
export class JwtStrategyAdmin extends PassportStrategy(Strategy, 'jwt_admin') {
    constructor(
        private readonly entityManager: EntityManager,
    ) {
        // Call the constructor of the parent class (PassportStrategy) with options for JWT authentication
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT token from the Authorization header
            ignoreExpiration: false, // Reject expired tokens
            secretOrKey: process.env.JWT_SECRET_ADMIN, // Secret key used for decoding the JWT token
        });
    }

    /**
     * Validates the JWT payload and retrieves the corresponding admin.
     * @param payload The payload extracted from the JWT token.
     * @returns The admin associated with the JWT token.
     * @throws UnauthorizedException If the admin is not found.
     */
    async validate(payload: any) {
        const { id } = payload; // Extract the admin ID from the JWT payload

        // Find the admin by ID in the database
        const admin = await this.entityManager.findOneBy(Admin, { id });

        // If the admin is not found, throw an unauthorized exception
        if (!admin) {
            throw new UnauthorizedException("Login first to access this endpoint");
        }

        // Return the found admin entity
        return admin;
    }
}
