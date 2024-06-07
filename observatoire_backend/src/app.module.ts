import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { Formulaire } from './formulaire/entity/form.entity';
import { FormulaireModule } from './formulaire/formulaire.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService): Promise<any> => ({
        type: configService.getOrThrow<string>('DB_TYPE'),
        host: configService.getOrThrow<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.getOrThrow<string>('DB_ROOT_USER'),
        password: configService.getOrThrow<string>('DB_ROOT_PASSWORD'),
        database: configService.getOrThrow<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: configService.getOrThrow<boolean>('DB_SYNCHRONIZE'),
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.getOrThrow('MAILER_HOST'),
          port: configService.getOrThrow('MAILER_PORT'),
          auth: {
            user: configService.getOrThrow('MAILER_USER'),
            pass: configService.getOrThrow('MAILER_PASSWORD'),
          },
        },
        defaults: {
          from: `"No Reply" <${configService.getOrThrow('MAIL_FROM')}>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new EjsAdapter(),
          options: {
            strict: false,
          },
        },
      }),
      inject: [ConfigService],
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    UserModule,
    AuthModule,
    AdminModule,
    FormulaireModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
