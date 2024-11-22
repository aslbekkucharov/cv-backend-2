import { Request } from 'express';
import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Req, UnauthorizedException, BadRequestException } from '@nestjs/common';

import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Pagination, PaginationParams } from 'src/decorators/pagination-params.decorator';
import { Public } from 'src/auth/public-strategy';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createPostDto: CreatePostDto, @Req() request: Request) {
    return this.postsService.create(createPostDto, request.user.username)
  }

  @Get()
  @Public()
  findUserPosts(@PaginationParams() pagination: Pagination, @Body() payload: { username: string }) {

    if (!payload.username) {
      throw new BadRequestException('Поле имя пользователя обязательно для поиска постов')
    }

    return this.postsService.findUserPosts(pagination, payload.username)
  }

  // @Get()
  // findAll() {
  //   return this.postsService.findAll()
  // }

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
