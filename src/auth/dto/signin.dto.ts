import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class SignInDto {
  @IsNotEmpty({ message: ({ property }) => `Значение для ${property} не может быть пустым` })
  @IsString({ message: ({ property }) => `Значение для ${property} должно быть строкой` })
  @MinLength(5, { message: 'Минимальная длина для имени пользователя 5 символов' })
  username: string

  @IsNotEmpty({ message: ({ property }) => `Значение для ${property} не может быть пустым` })
  @IsString({ message: ({ property }) => `Значение для ${property} должно быть строкой` })
  @MinLength(1, { message: 'Минимальная длина для пароля 8 символов' })
  password: string
}
