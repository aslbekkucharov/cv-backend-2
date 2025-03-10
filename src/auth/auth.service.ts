import { Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { compare, hash } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'

import { SignUpDto } from './dto/signup.dto'
import { ConfigService } from '@nestjs/config'
import { UsersService } from '@/users/users.service'
import { RefreshTokenService } from '@/refresh-token/refresh-token.service'
import { CookiePayload, DeviceInfo, RefreshTokenSessionGeneratorPayload, RequestUser } from '@/types'

@Injectable()
export class AuthService {
  private bcryptSalt: number
  private refreshTokenExpiration: number

  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private configService: ConfigService,
    private refreshTokenService: RefreshTokenService
  ) {
    this.bcryptSalt = +this.configService.getOrThrow<number>('BCRYPT_HASH_ROUNDS')
    this.refreshTokenExpiration = +this.configService.getOrThrow<number>('REFRESH_EXPIRATION_DAYS')
  }

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne(username)

    if (!user) {
      return null
    }

    const isPasswordsMatch = await compare(password, user.password)

    if (!isPasswordsMatch) {
      throw new UnauthorizedException('Неверный логин или пароль. Пожалуйста, проверьте данные и попробуйте снова.')
    }

    return user
  }

  async signIn(payload: RequestUser) {
    const tokens = this.generateTokens(payload)

    return {
      ...tokens
    }
  }

  async signUp(payload: SignUpDto) {
    const isUserExists = await this.usersService.findOne(payload.username)
    const isEmailInUse = await this.usersService.isEmailInUse(payload.email)

    if (isUserExists) {
      throw new BadRequestException({
        error: 'username_already_exists',
        message: 'Указанное имя пользователя уже занято'
      })
    }

    if (isEmailInUse) {
      throw new BadRequestException({
        error: 'email_already_used',
        message: 'Указанная электронная почта уже используется'
      })
    }

    const hashedPassword = await hash(payload.password, +this.bcryptSalt)
    const user = await this.usersService.create({ ...payload, password: hashedPassword })
    const tokens = this.generateTokens({ userId: user.id, username: user.username })

    return {
      ...tokens
    }
  }

  generateTokens(payload: RequestUser) {
    const accessToken = this.jwtService.sign(payload)
    const refreshToken = uuidv4()

    return {
      accessToken,
      refreshToken
    }
  }
}
