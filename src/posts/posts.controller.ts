import { Request } from 'express';
import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Req, UnauthorizedException } from '@nestjs/common';

import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createPostDto: CreatePostDto, @Req() request: Request) {
    return this.postsService.create(createPostDto, request.user.username)
  }

  @Get()
  findAll() {
    return this.postsService.findAll()
  }

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
