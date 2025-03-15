import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'

import { Profile } from '@/profiles/entities/profile.entity'
import { CreateProfileDto } from '@/profiles/dto/create-profile.dto'
import { UpdateProfileDto } from '@/profiles/dto/update-profile.dto'

@Injectable()
export class ProfilesService {
  constructor(@InjectRepository(Profile) private profileRepository: Repository<Profile>) {}

  async create(userId: number, payload: CreateProfileDto) {
    let profile = await this.profileRepository.findOneBy({ user: { id: userId } })

    if (profile) {
      throw new ConflictException({ error: 'profile_conflict', message: 'Профиль для этого пользователя уже существует' })
    }

    return this.profileRepository.save({ user: { id: userId }, ...payload })
  }

  findProfileByUserId(userId: number) {
    return this.profileRepository.findOneBy({ user: { id: userId } })
  }

  async update(userId: number, payload: UpdateProfileDto) {
    const profile = await this.findProfileByUserId(userId)

    if (!profile) {
      throw new NotFoundException({ error: 'profile_not_found', message: 'Профиль с таким идентификатором не найден' })
    }

    return this.profileRepository.createQueryBuilder().update(Profile).set(payload).where('id = :id', { id: profile.id }).returning('*').execute()
  }

  remove(id: number) {
    return `This action removes a #${id} profile`
  }
}
