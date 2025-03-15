import { ArrayMinSize, IsArray, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class CreateProfileDto {
  @IsNotEmpty({ message: ({ property }) => `Свойство ${property} не может быть пустым` })
  @MinLength(200, { message: ({ property }) => `Свойство ${property} должно быть не меньше 200 символов` })
  about: string

  @IsArray({ message: ({ property }) => `Свойство ${property} должен иметь тип массива` })
  @IsString({ each: true, message: 'Навык должен быть строкового типа' })
  @ArrayMinSize(5, { message: 'Укажите не меньше 5 навыков' })
  @IsNotEmpty({ message: ({ property }) => `Свойство ${property} не может быть пустым` })
  skills: string[]
}
