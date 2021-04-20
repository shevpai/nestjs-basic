import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';

@ApiTags('Authorization')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() loginDto: LoginDto
  ): Promise<void> {
    const { token } = await this.authService.login(loginDto);

    res.status(200);
    res.cookie('jwt', token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1e3),
      secure: false,
      httpOnly: true,
    });
  }

  @Post('/signup')
  async signup(
    @Res({ passthrough: true }) res: Response,
    @Body() userDto: CreateUserDto
  ): Promise<void> {
    const { token } = await this.authService.registration(userDto);
    res.status(200);
    res.cookie('jwt', token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1e3),
      secure: false,
      httpOnly: true,
    });
  }
}
