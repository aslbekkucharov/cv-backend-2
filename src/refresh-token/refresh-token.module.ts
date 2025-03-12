import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { RefreshTokenService } from '@/refresh-token/refresh-token.service'
import { RefreshToken } from '@/refresh-token/entities/refresh-tokens.entity'

@Module({
  exports: [RefreshTokenService],
  providers: [RefreshTokenService],
  imports: [ConfigModule, TypeOrmModule.forFeature([RefreshToken])]
})
export class RefreshTokenModule {}
