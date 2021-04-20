import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles-auth.decoratod';
import { Roles } from 'src/auth/roles.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 200, type: User })
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Get All Users' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  getAll(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Assign a role' })
  @ApiResponse({ status: 200 })
  @UsePipes(ValidationPipe)
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto): Promise<void> {
    return this.userService.addRole(dto);
  }

  @ApiOperation({ summary: 'Add user to banned list' })
  @ApiResponse({ status: 200 })
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/ban')
  banUser(@Body() dto: BanUserDto): Promise<User> {
    return this.userService.banUser(dto);
  }
}
