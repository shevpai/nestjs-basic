import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const token = req.cookies.jwt;

    if (!token) {
      throw new UnauthorizedException('You are not logged in');
    }

    const user = this.jwtService.verify(token);
    req.user = user;
    return true;
  }
}
