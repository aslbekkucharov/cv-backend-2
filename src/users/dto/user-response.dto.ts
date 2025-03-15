import { Exclude } from 'class-transformer'
import { CreateUserDto } from '@/users/dto/create-user.dto'

export class UsersResponseDto extends CreateUserDto {
  @Exclude()
  password: string

  @Exclude()
  createdAt: Date

  @Exclude()
  updatedAt: Date
}
