import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt-strategy';
import { JwtStrategyAdmin } from './jwt-strategy-admin';

@Global()
@Module({
  imports: [
     // Import PassportModule and configure it to use JWT authentication
     PassportModule.register({ defaultStrategy: "jwt"}),

     // Import JwtModule and configure it asynchronously using the ConfigService
     JwtModule.registerAsync({
       inject: [ConfigService],
       useFactory: (configService: ConfigService) => {
         return {
           secret: configService.getOrThrow<string>("JWT_SECRET"),
           signOptions: {
             expiresIn: configService.getOrThrow<string | number>("JWT_EXPIRE")
           }
         };
       }
     }),
  ],
  providers: [AuthService, JwtService, JwtStrategy, JwtStrategyAdmin],
  controllers: [AuthController],
  exports: [JwtStrategy]
})
export class AuthModule {}
