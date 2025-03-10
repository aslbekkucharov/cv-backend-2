import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, NotFoundException } from '@nestjs/common'

import { RequestUser } from '@/types'
import { AuthService } from '@/auth/auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super()
  }

  async validate(username: string, password: string): Promise<NotFoundException | RequestUser> {
    const user = await this.authService.validateUser(username, password)

    if (!user) {
      throw new NotFoundException('Пользователь с таким именем пользователя не найден. Проверьте правильность данных.')
    }

    return {
      userId: user.id,
      username: user.username
    }
  }
}
