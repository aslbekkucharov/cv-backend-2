import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {

  constructor(@InjectRepository(Post) private postRepository: Repository<Post>) { }

  create(createPostDto: CreatePostDto) {
    return this.postRepository.create(createPostDto)
  }

  findAll() {
    return this.postRepository.find()
  }

  findOne(slug: string) {
    return this.postRepository.findOne({ where: { slug } })
  }

  async update(slug: string, updatePostDto: UpdatePostDto) {
    await this.postRepository.update({ slug }, updatePostDto)
    const updatedPost = await this.findOne(slug)

    return updatedPost
  }

  async remove(slug: string) {

    const post = await this.findOne(slug)

    if (!post) {
      throw new NotFoundException('Пост с таким идентификатором не найден')
    }

    return await this.postRepository.remove(post)
  }
}
