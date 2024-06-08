import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { Admin } from './admin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
  ],
  providers: [AdminService],
  controllers: [AdminController]
})
export class AdminModule {
    
}
