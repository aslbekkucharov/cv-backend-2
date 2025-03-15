import { OmitType, PartialType } from '@nestjs/mapped-types'

import { CreateUserDto } from '@/users/dto/create-user.dto'

export class BaseUpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdateUserDto extends OmitType(BaseUpdateUserDto, ['password', 'email']) {}
