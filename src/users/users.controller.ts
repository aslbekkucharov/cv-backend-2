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
  constructor(private readonly usersService: UsersService) {}

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

  @Patch(':username')
  update(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.update(username, updateUserDto)
  }

  @Delete(':username')
  remove(@Param('username') username: string, @Req() request: Request) {
    if (request?.user?.username !== username) {
      throw new ForbiddenException(
        'У вас нет прав на выполнение этой операции!'
      )
    }

    return this.usersService.remove(username)
  }
}
