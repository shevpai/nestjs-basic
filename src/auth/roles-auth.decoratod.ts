import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.guard';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!requiredRoles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();

    const isNotRestricted = req.user.roles.some((role) =>
      requiredRoles.includes(role.value)
    );

    if (!isNotRestricted) {
      throw new HttpException(
        'You do not have permission to perform this action',
        HttpStatus.FORBIDDEN
      );
    }

    return true;
  }
}
