import { compare } from 'bcrypt'
import { Injectable } from '@nestjs/common'


import { UsersService } from '@/users/users.service'
@Injectable()
export class AuthService {

  constructor(private usersService: UsersService) { }

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne(username)

    if (!user) return null

    const isPasswordsMatch = await compare(password, user?.password)

    if (user && isPasswordsMatch) {
      return user
    }

    return null
  }

}
