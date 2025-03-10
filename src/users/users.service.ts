import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { User } from '@/users/entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  create(payload: CreateUserDto) {
    return this.userRepository.save(payload)
  }

  findOne(username: string) {
    return this.userRepository.findOne({ where: { username } })
  }

  isEmailInUse(email: string) {
    return this.userRepository.findOne({ where: { email } })
  }
}
