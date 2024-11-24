import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable, NotFoundException } from '@nestjs/common'

import { User } from './entities/user.entity'
import { UpdateUserDto } from './dto/update-user.dto'
import { CreateUserDto } from 'src/common/dto/create-user.dto'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  create(createUserDto: CreateUserDto): Promise<CreateUserDto & User> {
    return this.userRepository.save(createUserDto)
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  findOne(username: string, selectFields?: Array<keyof User>): Promise<User | undefined> {
    const fieldsToSelect = selectFields ? selectFields : []

    return this.userRepository.findOne({
      where: { username },
      select: ['email', 'fullname', 'id', 'username', ...fieldsToSelect]
    })
  }

  async update(username: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update({ username }, updateUserDto)
    const user = await this.findOne(updateUserDto.username)
    return user
  }

  async remove(username: string): Promise<User> {
    const user = await this.findOne(username)

    if (!user) {
      throw new NotFoundException('Пользователь не найден')
    }

    return await this.userRepository.remove(user)
  }

  async isEmailExists(email: string): Promise<boolean> {
    const count = await this.userRepository.count({ where: { email } })
    return count > 0
  }
}
