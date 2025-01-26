import { Module } from '@nestjs/common'

import { UsersService } from '@/users/users.service'
import { UsersController } from '@/users/users.controller'
import { TypeOrmDSModule } from '@/datasource/typeorm.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '@/users/entities/user.entity'

@Module({
  exports: [UsersService],
  providers: [UsersService],
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User])],
})

export class UsersModule { }