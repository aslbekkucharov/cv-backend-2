import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from 'src/common/dto/create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {}
