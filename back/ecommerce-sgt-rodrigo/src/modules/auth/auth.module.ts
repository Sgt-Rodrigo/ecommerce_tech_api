import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepositoryService } from './auth.repository';
import { UsersRepo } from '../users/usersDB.service';
import { User } from '../users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, AuthRepositoryService, UsersRepo],
})
export class AuthModule {}
