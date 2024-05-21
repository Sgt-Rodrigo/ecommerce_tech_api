import { Injectable, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepo } from './users.repository.service';

@Injectable()
export class UsersService {

  constructor(private usersRepo: UsersRepo){}

 async create(createUserDto: CreateUserDto) {
   try {
     const response = await this.usersRepo.createUser(createUserDto);
     return response
   } catch (error) {
    //w re-throw error coming from repo
    throw error
   }
   
  }

  async findAll() {
   try {
     const response = await this.usersRepo.getAllUsers();
     return response
   } catch (error) {
    throw error
   }
    
  }

  async findOne(id: string) {
   try {
     const response = await this.usersRepo.getUserByID(id);
     return response
   } catch (error) {
    throw error
   }
    
  }

  //! CAREFUL: PUT overwrites the whole entry, it is not like patch.
  //! you must always pass the whole entry with the changes
  async updatePut(id: string, updateUserDto: UpdateUserDto) {
    try {
     return  await this.usersRepo.updatePut(id, updateUserDto);
    } catch (error) {
      throw error
    }
  }

  async remove(id: string) {
    try {
      const response = await this.usersRepo.remove(id);
      return response
    } catch (error) {
      throw error
    }
  }
}
