import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class CreateUserDto {
    @IsNotEmpty({ message: 'Поле обязательно для заполнения' })
    @IsString({ message: 'Придумайте имя уникальное имя пользователя' })
    username: string

    @IsNotEmpty({ message: 'Поле обязятально для заполнения' })
    @IsString({ message: 'Полное имя должно содержать данные строкового типа' })
    fullname: string

    @IsNotEmpty({ message: 'Поле обязательно для заполнения' })
    @IsEmail({}, { message: 'Введите валидный Email' })
    email: string

    @IsNotEmpty({ message: 'Поле обязательно для заполнения' })
    @MinLength(8, { message: 'Минимальная длина пароля должна быть больше 8 символов' })
    password: string
}
