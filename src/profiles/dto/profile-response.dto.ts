import { Exclude } from 'class-transformer'
import { User } from '@/users/entities/user.entity'
import { CreateProfileDto } from '@/profiles/dto/create-profile.dto'

export class ProfileResponseDto extends CreateProfileDto {
  @Exclude()
  user: User

  @Exclude()
  userId: number
}
