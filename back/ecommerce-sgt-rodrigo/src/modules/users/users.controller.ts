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
  UseGuards,
  SetMetadata,
  ParseUUIDPipe,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/guards/roles/roles.guard';

@Controller('users')
@UseGuards(AuthGuard) 
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //w this endpoint is replaced by the auth one > auth/signup
//   @Post()
//   @SetMetadata('isPublic', true)
//  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
//    try {
//     const response = await this.usersService.create(createUserDto)

//       return res.status(201).json({
//         message: `user created with id: ${response.id}`
//       })     
//    } catch (error) {
//     throw error
//    }
//   }

  @Get()
  @SetMetadata('isPublic', true)
 async findAll(@Req() req: Request, @Res() res: Response) {
    try {
      const response = await this.usersService.findAll();

      return res.status(200).send(response)
      // return res.status(200).json({
      //   users: response,
      //   auth0: req.oidc.user
      // })
    } catch (error) {
      throw error
    }
  }

  @Get('admin')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  getAdmin(){
      return 'Protected Route: for admins only'
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
   try {
     const response = await this.usersService.findOne(id);
     return res.status(200).json(response)
   } catch (error) {
    throw error
   }
  }

  @Put(':id')
  async updatePut(@Param('id', ParseUUIDPipe) id: string, 
            @Body() updateUserDto: UpdateUserDto, 
            @Res() res: Response) {
    try {
      const response = await this.usersService.updatePut(id, updateUserDto);
      return res.status(200).json({
        message: 'user modified',
        user: response
      })
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
  async remove(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
   try {
    const response = await this.usersService.remove(id);
    return res.status(200).json({
      message:`User Removed Succesfully`,
      user: response
    })
   } catch (error) {
    throw error
   }
  }
}
