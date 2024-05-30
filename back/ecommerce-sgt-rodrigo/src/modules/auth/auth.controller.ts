import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, UsePipes, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Response } from 'express';
import { PasswordMatchPipe } from 'src/common/pipes/password_match.pipe';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
              
  ) {}

  
  @Post('signin')
  @SetMetadata('isPublic', true)
  async login(@Body() loginAuthDto: LoginAuthDto, @Res() res:Response) {
    try {
      const response = await this.authService.login(loginAuthDto);
      return res.status(200).json(response)
    } catch (error) {
      throw error
    }
  }

  @Post('signup')
  @SetMetadata('isPublic', true)
  @UsePipes(PasswordMatchPipe)
  async signUpUser(@Body() userData: CreateUserDto){
    try {
      const response = await this.authService.signUpUser(userData);
      return response
    } catch (error) {
      throw error
    }


  }
  
  // @Post()
  // create(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.create(createAuthDto);
  // }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
