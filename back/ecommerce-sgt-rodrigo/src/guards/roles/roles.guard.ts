import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from 'src/roles/roles.enum';


@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private readonly reflector:Reflector) {}


  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> { 
    //w reads the route handler metada in search of roles set, it returns an array of roles read from the metadata of an specific route handler
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
      'roles', [
        context.getHandler(),
        context.getClass()
      ]
    );

    //w gets the request and user property where the roles were stored by the AuthGuard
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    //w iterates through the requeiredRoles to see if any of them are included in the user.roles
    const hasRole = ()=>
      requiredRoles.some(role => user?.roles?.includes(role));

    //w if all is true then is authorized otherwise throw error
    const valid = user && user.roles && hasRole();
    if(!valid) {
      throw new ForbiddenException('Not Authorized to access this route')
    }

    return true;
  }
}
