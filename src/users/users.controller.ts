import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common'

import { UsersService } from '@/users/users.service'
import { AuthGuard } from '@nestjs/passport'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('update')
  async update(@Body() body: Record<string, number>) {
    return `Updating ${body.id}`
  }
}
