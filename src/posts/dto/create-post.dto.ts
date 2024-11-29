import { IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class CreatePostDto {
  @IsNotEmpty({ message: 'Введите заголовок' })
  @MaxLength(200, { message: 'Максмальная длина заголовка 200 символов' })
  title: string

  @IsNotEmpty({ message: 'Введите короткое описание' })
  @MinLength(150, { message: 'Минимальная длина краткого описания 150 символов' })
  shortDescription: string

  @IsNotEmpty({ message: 'Контент для поста обязательно для заполнения' })
  content: string
}
