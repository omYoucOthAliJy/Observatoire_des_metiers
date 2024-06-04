import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { Question } from './entity/question.entity';
import { Formation } from './entity/formation.entity';
import { Speciality } from './entity/speciality.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';


@Module({
  imports: [TypeOrmModule.forFeature([User, Question, Formation, Speciality]),
  MailerModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
