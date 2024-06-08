import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}
    /**
     * Endpoint for user login.
     * @param loginDto Data for user login.
     * @returns An object containing a JWT token upon successful login.
     */
    @Post("/login") 
    async login(@Body() loginDto: LoginDto): Promise<{token: string}> {
        return await this.authService.login(loginDto);
    }


    @Post("/admin/login") 
    async adminlogin(@Body() loginDto: LoginDto): Promise<{token: string}> {
        return await this.authService.adminLogin(loginDto);
    }
}
