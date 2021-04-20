import * as bcrypt from 'bcryptjs';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login-dto';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const user = await this.validateUser(loginDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto): Promise<{ token: string }> {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST
      );
    }

    const hashedpassword = await bcrypt.hash(userDto.password, 12);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashedpassword,
    });

    return this.generateToken(user);
  }

  private generateToken(user: User): { token: string } {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(loginDto: LoginDto) {
    const user = await this.userService.getUserByEmail(loginDto.email);

    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException({ message: 'Invalid email or password' });
    }

    return user;
  }
}
