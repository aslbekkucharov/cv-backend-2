import { Repository } from 'typeorm'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { RefreshToken } from '@/refresh-token/entities/refresh-tokens.entity'
import { ConfigService } from '@nestjs/config'

interface RefreshTokenPayload {
  token: string
  userId: number
  device: string
}

@Injectable()
export class RefreshTokenService {
  private refreshTokenExpireDays: number

  constructor(
    private configService: ConfigService,
    @InjectRepository(RefreshToken) private refreshTokenRepository: Repository<RefreshToken>
  ) {
    this.refreshTokenExpireDays = +this.configService.getOrThrow<number>('REFRESH_EXPIRATION_DAYS')
  }

  async save(payload: RefreshTokenPayload) {
    const expiresIn = new Date()
    expiresIn.setDate(expiresIn.getDate() + this.refreshTokenExpireDays)

    return this.refreshTokenRepository.save({ ...payload, expiresIn })
  }

  async find(token: string) {
    return this.refreshTokenRepository.findOneBy({ token })
  }

  async rotateRefreshToken(oldToken: string, newTokenPayload: RefreshTokenPayload) {
    const currentDate = new Date()
    const oldSession = await this.refreshTokenRepository.findOneBy({ token: oldToken })

    if (!oldSession || !oldSession.isActive || oldSession.expiresIn < currentDate) {
      throw new UnauthorizedException({ error: 'invalid_refresh_token', message: 'Невалидный токен для обновления.' })
    }

    await this.refreshTokenRepository.update({ id: oldSession.id }, { isActive: false })

    return this.save(newTokenPayload)
  }

  async delete(entity: RefreshToken) {
    return this.refreshTokenRepository.remove(entity)
  }
}
