import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable() 
export class AuthGuard implements CanActivate {
  constructor(private reflector:Reflector,
              private readonly jwtService:JwtService
  ) {}

  async canActivate(
    context: ExecutionContext,
  ):  Promise<boolean> {

    //w skips methods where authorization is not mandatory
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) {
      //* Skip authentication by returning early
      return true;
    }

    //w checks authorization, gets the header 'Basic: <email>:<password>'
    const request = context.switchToHttp().getRequest();

    const token = request.headers['authorization']?.split(' ')[1] ?? '';
    if(!token) {
      throw new UnauthorizedException('Bearer Token Not Found')
    }

    try {
      const secret = process.env.JWT_SECRET;
      const payload = await this.jwtService.verifyAsync(token, {secret});
      payload.iat = new Date(payload.iat * 1000);
      payload.exp = new Date(payload.exp * 1000);
      return true
    } catch (error) {
      throw new UnauthorizedException('Invalid Token')
    }
  }
}
