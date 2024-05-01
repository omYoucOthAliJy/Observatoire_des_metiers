import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {TypeOrmModule} from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';



@Module({
  imports: [
  TypeOrmModule.forRootAsync({
    imports :[ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),],
    useFactory: (configService: ConfigService) => ({
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: +configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: [User],
    //entities:[__dirname,'/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
  inject: [ConfigService],
}),
    UserModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
