import { v4 as uuidv4 } from 'uuid'
import { compare, hash } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'

import { RequestUser } from '@/types'
import { SignUpDto } from './dto/signup.dto'
import { ConfigService } from '@nestjs/config'
import { UsersService } from '@/users/users.service'
import { RefreshTokenService } from '@/refresh-token/refresh-token.service'

@Injectable()
export class AuthService {
  private bcryptSalt: number

  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private configService: ConfigService,
    private refreshTokenService: RefreshTokenService
  ) {
    this.bcryptSalt = +this.configService.getOrThrow<number>('BCRYPT_HASH_ROUNDS')
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

  async signIn(payload: RequestUser, device: string) {
    const tokens = this.generateAndSaveTokens(payload, device)

    return tokens
  }

  async signUp(payload: SignUpDto, device: string) {
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
    const tokens = this.generateAndSaveTokens({ userId: user.id, username: user.username }, device)

    return tokens
  }

  async rotateAndGenerateTokens(oldRefreshToken: string, user: RequestUser, device: string) {
    const oldSession = await this.refreshTokenService.find(oldRefreshToken)

    if (!oldSession || !oldSession.isActive || oldSession.userId !== user.userId) {
      throw new UnauthorizedException({
        error: 'invalid_token_or_user_mismatch',
        message: 'Неверный токен обновления или несоответствие пользователей'
      })
    }

    const tokens = this.generateTokens(user)

    await this.refreshTokenService.rotateRefreshToken(oldRefreshToken, {
      device: device,
      userId: user.userId,
      token: tokens.refreshToken
    })

    return tokens
  }

  async generateAndSaveTokens(payload: RequestUser, device: string) {
    const tokens = this.generateTokens(payload)

    await this.refreshTokenService.save({
      device: device,
      userId: payload.userId,
      token: tokens.refreshToken
    })

    return tokens
  }

  async getSessionByRefreshToken(refreshToken: string) {
    return this.refreshTokenService.find(refreshToken)
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
