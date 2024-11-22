import { ConfigModule, ConfigService } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { UsersModule } from 'src/users/users.module'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from './guards/auth.guard'

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      async useFactory(configService: ConfigService) {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get<string>('JWT_EXPIRE', '1d')
          }
        }
      }
    }),
    UsersModule,
    ConfigModule
  ],
  controllers: [AuthController],
  providers: [AuthService, { provide: APP_GUARD, useClass: AuthGuard }]
})
export class AuthModule {}
