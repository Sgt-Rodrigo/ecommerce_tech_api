import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepo } from '../users/users.repository.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthRepositoryService {
    constructor(private readonly usersRepo: UsersRepo) {}

    async login(loginAuthDto:LoginAuthDto){
       //w validation is done through class-validator in dto file
        //! is pagination only for products then?, cause here I need all users.
       try {
        const response = await this.usersRepo.getAllUsers();
        const data = response.data;
        console.log(data)

        //w find user
        const user = data.find((user:User) => user.email === loginAuthDto.email);

        if(!user || user.password !== loginAuthDto.password){
            throw new BadRequestException('Incorrect email or password');
        }

        return 'user logged in'

       } catch (error) {
        throw new HttpException('Login attempt failed, our bad! Try again', HttpStatus.INTERNAL_SERVER_ERROR )
       }
    }
}
