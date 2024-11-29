import { Request } from 'express'
import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException
} from '@nestjs/common'

import { UsersService } from './users.service'
import { Public } from 'src/auth/public-strategy'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Public()
  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Public()
  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.usersService.findOne(username)
  }

  @Patch('me')
  update(@Body() updateUserDto: UpdateUserDto, @Req() request: Request) {

    if (!request?.user?.username) {
      throw new ForbiddenException('У вас нет прав на выполнение этой операции!')
    }

    return this.usersService.update(request?.user?.username, updateUserDto)
  }

  @Delete('me')
  remove(@Req() request: Request) {

    if (!request?.user?.username) {
      throw new ForbiddenException('У вас нет прав на выполнение этой операции!')
    }

    return this.usersService.remove(request?.user?.username)
  }
}
