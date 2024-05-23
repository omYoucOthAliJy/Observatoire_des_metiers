import { ExecutionContext, CanActivate, Injectable } from '@nestjs/common';
import { UserRole } from './roles.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());
    if (!roles) {
      // Si aucun rôle n'est spécifié pour cette route, tout le monde peut y accéder.
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const userRole = request.user.role; // Supposons que vous stockiez le rôle de l'utilisateur dans request.user.role

    // Vérifiez si le rôle de l'utilisateur est autorisé
    return roles.includes(userRole);
  }
}
