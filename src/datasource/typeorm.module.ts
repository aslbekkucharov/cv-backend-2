import { DataSource } from 'typeorm'
import { ConfigService } from '@nestjs/config'
import { Global, Module } from '@nestjs/common'
import { User } from '@/users/entities/user.entity'
import { Profile } from '@/profiles/entities/profile.entity'
import { RefreshToken } from '@/refresh-token/entities/refresh-tokens.entity'

@Global()
@Module({
  exports: [DataSource],
  providers: [
    {
      provide: DataSource,
      useFactory: async (config: ConfigService) => {
        try {
          const dataSource = new DataSource({
            type: 'postgres',
            host: config.getOrThrow('DATABASE_HOST'),
            port: config.getOrThrow('DATABASE_PORT'),
            username: config.getOrThrow('DATABASE_USER'),
            database: config.getOrThrow('DATABASE_NAME'),
            password: config.getOrThrow('DATABASE_PASSWORD'),
            entities: [User, Profile, RefreshToken],
            migrations: [`${__dirname}/../migrations/*.{ts,js}`]
          })

          await dataSource.initialize()

          console.log('Database connected successfully')

          return dataSource
        } catch (error) {
          console.log('Error connecting to database')
          throw error
        }
      },
      inject: [ConfigService]
    }
  ]
})
export class TypeOrmDSModule {}
