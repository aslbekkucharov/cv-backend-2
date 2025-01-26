import { Module } from '@nestjs/common'

import { PassportModule } from '@nestjs/passport'
import { AuthService } from '@/auth/auth.service'
import { UsersModule } from '@/users/users.module'
import { AuthController } from '@/auth/auth.controller'
import { LocalStrategy } from '@/auth/strategies/local.strategy'

@Module({
  controllers: [AuthController],
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule { }
