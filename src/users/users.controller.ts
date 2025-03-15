import { Request } from 'express'
import { AuthGuard } from '@nestjs/passport'
import { plainToInstance } from 'class-transformer'
import { Body, Controller, Delete, ForbiddenException, Get, NotFoundException, Param, ParseIntPipe, Patch, Req, UnauthorizedException, UseGuards } from '@nestjs/common'

import { UsersService } from '@/users/users.service'
import { UpdateUserDto } from '@/users/dto/update-user.dto'
import { UsersResponseDto } from '@/users/dto/user-response.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getUserProfile(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    if (req.user?.userId !== id) {
      throw new ForbiddenException({ error: 'access_denied', message: 'У вас нет прав на выполнение этого действия' })
    }

    const user = await this.usersService.findOneById(id)

    if (!user) {
      throw new NotFoundException({ error: 'user_not_found', message: 'Пользователь не найден' })
    }

    return plainToInstance(UsersResponseDto, user)
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/me')
  async updateUser(@Req() req: Request, @Body() payload: UpdateUserDto) {
    const userId = req.user.userId

    const isUserExists = await this.usersService.findOneById(userId)

    if (!isUserExists) {
      throw new NotFoundException({ error: 'user_not_found', message: 'Пользователь не найден' })
    }

    const updateResult = await this.usersService.update(userId, payload)

    if (updateResult.affected === 0) {
      throw new NotFoundException({ error: 'update_failed', message: 'Пользователь не найден и данные не обновлены' })
    }

    return plainToInstance(UsersResponseDto, updateResult.raw[0])
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/me')
  async deleteUser(@Req() req: Request) {
    const userId = req.user.userId

    if (!userId) {
      throw new UnauthorizedException({ error: 'access_denied', message: 'У вас нет прав на выполнение этого действия' })
    }

    const user = await this.usersService.delete(userId)

    return plainToInstance(UsersResponseDto, user)
  }
}
