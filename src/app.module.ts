import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { ConfigurationModule } from './config/config.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './users/entities/user.entity'
import { ConfigService } from '@nestjs/config'
import { DataSource } from 'typeorm'
import { AuthModule } from './auth/auth.module'
import { PostsModule } from './posts/posts.module'
import { Post } from './posts/entities/post.entity'

@Module({
  providers: [],
  imports: [
    ConfigurationModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      async useFactory(configService: ConfigService) {
        return {
          type: 'postgres',
          database: configService.get<string>('DB_NAME'),
          port: +configService.get<number>('DB_PORT', 5432),
          host: configService.get<string>('DB_HOST', 'localhost'),
          password: configService.get<string>('DB_PASSWORD', 'password'),
          username: configService.get<string>('DB_USERNAME', 'user'),
          entities: [User, Post],
        }
      }
    }),
    UsersModule,
    AuthModule,
    PostsModule
  ],
})

export class AppModule { }
