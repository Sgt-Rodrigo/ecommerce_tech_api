import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable() 
export class AuthGuard implements CanActivate {
  constructor(private reflector:Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    //w skips methods where authorization is not mandatory
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) {
      //* Skip authentication by returning early
      return true;
    }

    //w checks authorization, gets the header 'Basic: <email>:<password>'
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    console.log(authHeader);

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const [type, ...credentials] = authHeader.split(':');

    if (type !== 'Basic' || credentials.length === 0) {
      throw new UnauthorizedException('Invalid Authorization header format. Expected: Basic: <email>:<password>');
    } 

    const [email, password] = credentials;

    if (!email || !password) {
      throw new UnauthorizedException('Email and password are required in Authorization header');
    }

    return true;
  }
}
