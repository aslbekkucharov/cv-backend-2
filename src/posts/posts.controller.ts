import { Request } from 'express';
import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Req, BadRequestException, Query } from '@nestjs/common';

import { PostsService } from './posts.service';
import { Public } from 'src/auth/public-strategy';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Pagination, PaginationParams } from 'src/decorators/pagination-params.decorator';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createPostDto: CreatePostDto, @Req() request: Request) {
    console.log(createPostDto)
    return this.postsService.create(createPostDto, request.user.username)
  }

  @Public()
  @Get()
  findUserPosts(@PaginationParams() pagination: Pagination, @Query('username') username: string) {

    if (!username) {
      throw new BadRequestException('Поле имя пользователя обязательно для поиска постов')
    }

    return this.postsService.findUserPosts(pagination, username)
  }

  @Public()
  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.postsService.findOne(slug)
  }

  @Patch('slug')
  update(@Param('slug') slug: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(slug, updatePostDto)
  }

  @Delete('slug')
  remove(@Param('slug') slug: string) {
    return this.postsService.remove(slug)
  }
}
