import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepositoryService } from './auth.repository';
import { UsersRepo } from '../users/users.repository.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthRepositoryService, UsersRepo],
})
export class AuthModule {}
