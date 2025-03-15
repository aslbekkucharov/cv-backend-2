import { Expose } from 'class-transformer'
import { CreateUserDto } from '@/users/dto/create-user.dto'

export class SignUpDto extends CreateUserDto {}
