import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty({ message: ({ property }) => `Значение для ${property} не может быть пустым` })
  @IsString({ message: ({ property }) => `Значение для ${property} должно быть строкой` })
  @MinLength(1, { message: 'Минимальная длина для имени 1 символ' })
  name: string

  @IsNotEmpty({ message: ({ property }) => `Значение для ${property} не может быть пустым` })
  @IsString({ message: ({ property }) => `Значение для ${property} должно быть строкой` })
  image: string

  @IsNotEmpty({ message: ({ property }) => `Значение для ${property} не может быть пустым` })
  @IsEmail({}, { message: 'Введите валидный E-mail' })
  email: string

  @IsNotEmpty({ message: ({ property }) => `Значение для ${property} не может быть пустым` })
  @IsString({ message: ({ property }) => `Значение для ${property} должно быть строкой` })
  @MinLength(5, { message: 'Минимальная длина для имени пользователя 5 символов' })
  username: string

  @IsNotEmpty({ message: ({ property }) => `Значение для ${property} не может быть пустым` })
  @IsString({ message: ({ property }) => `Значение для ${property} должно быть строкой` })
  @MinLength(8, { message: 'Минимальная длина пароля 8 символов' })
  password: string
}
