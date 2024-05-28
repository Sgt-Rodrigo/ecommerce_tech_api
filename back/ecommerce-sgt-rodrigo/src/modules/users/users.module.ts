import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepo } from './usersDB.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepo],
})
export class UsersModule {}
