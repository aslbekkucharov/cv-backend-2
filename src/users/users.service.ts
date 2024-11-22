import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable, NotFoundException } from '@nestjs/common'

import { User } from './entities/user.entity'
import { UpdateUserDto } from './dto/update-user.dto'
import { CreateUserDto } from 'src/common/dto/create-user.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto)
  }

  findAll() {
    return this.userRepository.find()
  }

  findOne(
    username: string,
    selectFields?: Array<keyof User>
  ): Promise<User | undefined> {
    const fieldsToSelect = selectFields ? selectFields : []

    return this.userRepository.findOne({
      where: { username },
      select: ['email', 'fullname', 'id', 'username', ...fieldsToSelect]
    })
  }

  async update(username: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.update({ username }, updateUserDto)
    const user = await this.findOne(updateUserDto.username)
    return user
  }

  async remove(username: string) {
    const user = await this.findOne(username)

    if (!user) {
      throw new NotFoundException(
        'Пользователь с таким именем пользователя не существует'
      )
    }

    return await this.userRepository.remove(user)
  }
}
