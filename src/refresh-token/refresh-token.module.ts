import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { RefreshTokenService } from '@/refresh-token/refresh-token.service'
import { RefreshToken } from '@/refresh-token/entities/refresh-tokens.entity'

@Module({
  exports: [RefreshTokenService],
  providers: [RefreshTokenService],
  imports: [TypeOrmModule.forFeature([RefreshToken])]
})
export class RefreshTokenModule {}
