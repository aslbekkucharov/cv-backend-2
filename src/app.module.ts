import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AuthModule } from '@/auth/auth.module'
import { UsersModule } from '@/users/users.module'
import { TypeOrmDSModule } from './datasource/typeorm.module'
import { RefreshTokenModule } from './refresh-token/refresh-token.module'

@Module({
  providers: [],
  controllers: [],
  imports: [AuthModule, UsersModule, TypeOrmDSModule, ConfigModule.forRoot({ isGlobal: true }), RefreshTokenModule]
})
export class AppModule {}
