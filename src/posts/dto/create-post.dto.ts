import { IsNotEmpty, MaxLength, MinLength } from "class-validator"

export class CreatePostDto {
    @IsNotEmpty({ message: 'Введите заголовок' })
    @MinLength(15, { message: 'Минимальная длина заголовка 15 символов' })
    @MaxLength(200, { message: 'Максмальная длина заголовка 200 символов' })
    title: string

    @IsNotEmpty({ message: 'Введите короткое описание' })
    @MinLength(150, { message: 'Минимальная длина краткого описания 150 символов' })
    @MaxLength(250, { message: 'Максимальная длина краткого описания 250 символов' })
    shortDescription: string

    @IsNotEmpty({ message: 'Контент для поста обязательно для заполнения' })
    content: string
}
