import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { AuthService } from '@/auth/auth.service'
import { UsersModule } from '@/users/users.module'
import { JwtStrategy } from './strategies/jwt.strategy'
import { AuthController } from '@/auth/auth.controller'
import { LocalStrategy } from '@/auth/strategies/local.strategy'
import { RefreshTokenModule } from '@/refresh-token/refresh-token.module'

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule,
    ConfigModule,
    PassportModule,
    RefreshTokenModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION') }
      })
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
