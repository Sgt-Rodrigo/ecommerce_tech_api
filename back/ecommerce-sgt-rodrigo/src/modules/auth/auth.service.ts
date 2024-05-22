  import { Injectable } from '@nestjs/common';
  import { CreateAuthDto } from './dto/create-auth.dto';
  import { UpdateAuthDto } from './dto/update-auth.dto';
  import { LoginAuthDto } from './dto/login-auth.dto';
  import { AuthRepositoryService } from './auth.repository';

  @Injectable()
  export class AuthService {

    constructor(private readonly authRepo:AuthRepositoryService) {}

    async login(loginAuthDto:LoginAuthDto){
      try {
        const response = await this.authRepo.login(loginAuthDto);
        return response
      } catch (error) {
        throw error
      }
    }

    create(createAuthDto: CreateAuthDto) {
      return 'This action adds a new auth';
    }

    findAll() {
      return `This action returns all auth`;
    }

    findOne(id: number) {
      return `This action returns a #${id} auth`;
    }

    update(id: number, updateAuthDto: UpdateAuthDto) {
      return `This action updates a #${id} auth`;
    }

    remove(id: number) {
      return `This action removes a #${id} auth`;
    }
  }
