import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {
    console.log(reflector);
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    //console.log(roles, user.profile)
    if (roles.includes(user.profile)) {
      return true;
    }
    throw new UnauthorizedException(
      'Não possui permissão para acessar essa rota',
    );
  }
}
