import { Request } from 'express'
import { AuthGuard } from '@nestjs/passport'
import { plainToInstance } from 'class-transformer'
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException, NotFoundException } from '@nestjs/common'

import { ProfilesService } from '@/profiles/profiles.service'
import { CreateProfileDto } from '@/profiles/dto/create-profile.dto'
import { UpdateProfileDto } from '@/profiles/dto/update-profile.dto'
import { ProfileResponseDto } from '@/profiles/dto/profile-response.dto'

@Controller('profile')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Req() req: Request, @Body() payload: CreateProfileDto) {
    const userId = req.user.userId

    const profile = await this.profilesService.create(userId, payload)

    return plainToInstance(ProfileResponseDto, profile)
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Req() req: Request) {
    const userId = req.user.userId

    if (!userId) {
      throw new UnauthorizedException({ error: 'access_denied', message: 'У вас нет прав на выполнение этого действия' })
    }

    const profile = await this.profilesService.findProfileByUserId(userId)

    return plainToInstance(ProfileResponseDto, profile)
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  async update(@Req() req: Request, @Body() updateProfileDto: UpdateProfileDto) {
    const userId = req.user.userId

    const updatedProfile = await this.profilesService.update(userId, updateProfileDto)

    if (updatedProfile.affected === 0) {
      throw new NotFoundException({ error: 'update_failed', message: 'Профиль не найден и данные не обновлены' })
    }

    return plainToInstance(ProfileResponseDto, updatedProfile.raw[0])
  }
}
