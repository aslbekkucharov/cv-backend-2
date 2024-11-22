import { IsNotEmpty, MinLength } from 'class-validator'

export default class SignInDto {
  @IsNotEmpty({ message: 'Введите имя пользователя' })
  username: string

  @IsNotEmpty({ message: 'Введите пароль' })
  @MinLength(8, {
    message: 'Минимальная длина пароля должна быть больше 8 символов'
  })
  password: string
}
