  import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
  import { CreateAuthDto } from './dto/create-auth.dto';
  import { UpdateAuthDto } from './dto/update-auth.dto';
  import { LoginAuthDto } from './dto/login-auth.dto';
  import { AuthRepositoryService } from './auth.repository';
  import { CreateUserDto } from '../users/dto/create-user.dto';
  import { UsersService } from '../users/users.service';
  const bcrypt = require('bcrypt');

  @Injectable()
  export class AuthService {

    constructor(private readonly authRepo:AuthRepositoryService,
                private readonly usersService:UsersService
    ) {}

    async login(loginAuthDto:LoginAuthDto){
      try {
        const dbUser = await this.usersService.findUserByEmail(loginAuthDto.email);
        if(!dbUser) throw new BadRequestException('User not Found');

        //w validates password/hash
        const isValidPassword = await bcrypt.compare(loginAuthDto.password, dbUser.password);
        if(!isValidPassword) throw new BadRequestException('Invalid Password');
        

        return {success: 'User Logged In Succesfully'}
      } catch (error) {
        throw error
      }
    }

 

    async signUpUser(userData: CreateUserDto) {
     try {
       //w checks if user already exists
       const dbUser = await this.usersService.findUserByEmail(userData.email); 
       if(dbUser) throw new BadRequestException('User already exists');
 
        //w extracts fields from DTO excluding passwordConfirmation
       const { passwordConfirmation, ...userDto } = userData;
 
         const hashedPassword = await bcrypt.hash(userData.password, 10);
         if(!hashedPassword) throw new HttpException('Error hashing password', HttpStatus.SERVICE_UNAVAILABLE)
           
           const newUser = {
             ...userDto,
             password: hashedPassword
           }
           console.log(newUser);
 
           const response = await this.usersService.saveUser(newUser);
 
         return response
     } catch (error) {
       throw error
     }   
    }

    findAll() {
      return `This action returns all auth`;
    }

    findOne(id: string) {
      return `This action returns a #${id} auth`;
    }

    update(id: number, updateAuthDto: UpdateAuthDto) {
      return `This action updates a #${id} auth`;
    }

    remove(id: number) {
      return `This action removes a #${id} auth`;
    }
  }
