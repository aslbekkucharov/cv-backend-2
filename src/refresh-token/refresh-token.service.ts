import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { RefreshToken } from '@/refresh-token/entities/refresh-tokens.entity'

interface RefreshTokenPayload {
  token: string
  userId: number
  device: string
  expiresIn: number
}

@Injectable()
export class RefreshTokenService {
  constructor(@InjectRepository(RefreshToken) private refreshTokenRepository: Repository<RefreshToken>) {}

  async save(payload: RefreshTokenPayload) {
    const expiresIn = new Date()
    expiresIn.setDate(expiresIn.getDate() + payload.expiresIn)

    return this.refreshTokenRepository.save({ ...payload, expiresIn })
  }

  async delete(entity: RefreshToken) {
    return this.refreshTokenRepository.remove(entity)
  }
}
