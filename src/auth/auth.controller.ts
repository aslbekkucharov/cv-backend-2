import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'

import SignInDto from './dto/signin.dto'
import { Public } from './public-strategy'
import { AuthService } from './auth.service'
import { UsersService } from 'src/users/users.service'
import { CreateUserDto } from 'src/common/dto/create-user.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) { }

  @Public()
  @Post('signin')
  @UsePipes(new ValidationPipe())
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto)
  }

  @Public()
  @Post('signup')
  @UsePipes(new ValidationPipe())
  async signUp(@Body() signUpDto: CreateUserDto) {

    const isEmailExists = await this.usersService.isEmailExists(signUpDto.email)

    if (isEmailExists) {
      throw new BadRequestException('Введенная почта уже зарегистрирована в системе')
    }

    return this.authService.signUp(signUpDto)
  }
}
