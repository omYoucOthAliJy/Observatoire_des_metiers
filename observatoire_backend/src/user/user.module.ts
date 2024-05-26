import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { MailerModule } from '@nestjs-modules/mailer';


@Module({
  imports: [TypeOrmModule.forFeature([User]),
  MailerModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
