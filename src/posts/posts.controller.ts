import { Body, Controller, UseGuards, Post, Req, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles-auth.decoratod';
import { Roles } from 'src/auth/roles.guard';
import { User } from 'src/users/users.model';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostModel } from './posts.model';
import { PostsService } from './posts.service';

interface ExtndReqest extends Request {
  user: User;
}

@Controller('api/posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @ApiOperation({ summary: 'Create Post' })
  @ApiResponse({ status: 201, type: PostModel })
  @Roles('user', 'admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  createPost(
    @Req() req: ExtndReqest,
    @Body() dto: CreatePostDto
  ): Promise<PostModel> {
    const userId = req.user.id;
    return this.postService.create(userId, dto);
  }
  @ApiOperation({ summary: 'Get All Posts' })
  @ApiResponse({ status: 200, type: [PostModel] })
  @Get()
  getAll(): Promise<PostModel[]> {
    return this.postService.getAll();
  }
}
