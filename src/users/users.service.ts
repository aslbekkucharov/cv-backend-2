import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable, NotFoundException } from '@nestjs/common'

import { User } from '@/users/entities/user.entity'
import { CreateUserDto } from '@/users/dto/create-user.dto'
import { UpdateUserDto } from '@/users/dto/update-user.dto'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  create(payload: CreateUserDto) {
    return this.userRepository.save(payload)
  }

  update(id: number, payload: UpdateUserDto) {
    return this.userRepository.createQueryBuilder().update(User).set(payload).where('id = :id', { id }).returning('*').execute()
  }

  async delete(id: number) {
    const user = await this.findOneById(id)

    if (!user) {
      throw new NotFoundException({ error: 'user_not_found', message: 'Пользователь не найден' })
    }

    return this.userRepository.remove(user)
  }

  findOne(username: string) {
    return this.userRepository.findOne({ where: { username } })
  }

  findOneById(id: number) {
    return this.userRepository.findOneBy({ id })
  }

  isUsernameExists(username: string) {
    return this.userRepository.existsBy({ username })
  }

  isEmailInUse(email: string) {
    return this.userRepository.existsBy({ email })
  }
}
