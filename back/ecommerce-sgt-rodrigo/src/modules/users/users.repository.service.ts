import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import axios from 'axios';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersRepo{
    private readonly jsonServerUrl = 'http://localhost:8000/users';

    async getAllUsers(){
        try {
            const response = await axios.get(this.jsonServerUrl);
            const users = response.data.map(({password, ...user}:User) => user)
            return users
        } catch (error) {
            throw new HttpException('Error fetching all users', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getUserByID(id:string){
       try {
         const response = await axios.get(`${this.jsonServerUrl}/${id}`)
        const {password, ...user} = response.data;
         return user
       } catch (error) {
        throw new HttpException('Error retrieveing user', HttpStatus.INTERNAL_SERVER_ERROR)
       }
    }

    async createUser(userData:CreateUserDto){
        try {
            const newCustomer = {
                ...userData,
                role: 'customer',
            };
         
            
            const response = await axios.post(this.jsonServerUrl, newCustomer);
            console.log(response.data)
            return response.data
        } catch (error) {
            throw new HttpException('Error creating user', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updatePut(id: string, updatedUserData:UpdateUserDto){
     try {
        const response = await axios.put(`${this.jsonServerUrl}/${id}`, updatedUserData);
        return response.data
     } catch (error) {
        throw new HttpException('Error updating user', HttpStatus.INTERNAL_SERVER_ERROR)
     }
    }

    async remove(id: string) {
       try {
         const response = await axios.delete(`${this.jsonServerUrl}/${id}`);
         return response.data
       } catch (error) {
        throw new  HttpException('User Deletion Failed', HttpStatus.INTERNAL_SERVER_ERROR )
       }
    }
}
