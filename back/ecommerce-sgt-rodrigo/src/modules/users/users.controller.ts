import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
 async  create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
   try {
    const response = await this.usersService.create(createUserDto)

      return res.status(201).json({
        message: `user created with id: ${response.id}`
      })     
   } catch (error) {
    throw error
   }
  }

  @Get()
 async findAll(@Res() res: Response) {
    try {
      const response = await this.usersService.findAll();
      return res.status(200).json(response)
    } catch (error) {
      throw error
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
   try {
    //! Remember you are passing id as a string for json server
    //! And the entity User was set as number | string
     const response = await this.usersService.findOne(id);
     return res.status(200).json(response)
   } catch (error) {
    throw error
   }
  }

  @Put(':id')
  async updatePut(@Param('id') id: string, 
            @Body() updateUserDto: UpdateUserDto, 
            @Res() res: Response) {
    try {
      const response = await this.usersService.updatePut(id, updateUserDto);
      return res.status(200).json(`user with id ${response.id} modified`)
    } catch (error) {
      throw error
    }
  }

  //w review how this works
  // @Patch(':id')
  // updatePatch(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
   try {
    const response = await this.usersService.remove(id);
    return res.status(200).json({
      message:`User with id ${response.id} Removed Succesfully`
    })
   } catch (error) {
    throw error
   }
  }
}
