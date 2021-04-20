import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './posts.model';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post) private postRepository: typeof Post) {}

  async create(userId: number, dto: CreatePostDto): Promise<Post> {
    const post = await this.postRepository.create({ userId, ...dto });
    return post;
  }

  async getAll(): Promise<Post[]> {
    const posts = await this.postRepository.findAll();
    return posts;
  }
}
