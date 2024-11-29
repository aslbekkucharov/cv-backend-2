import { Response } from 'express'
import { Body, Controller, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common'

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
  async signIn(@Res({ passthrough: true }) response: Response, @Body() signInDto: SignInDto) {

    const result = await this.authService.signIn(signInDto)

    response.cookie('token', result.tokens.access, { httpOnly: true })

    return result
  }

  @Public()
  @Post('signup')
  @UsePipes(new ValidationPipe())
  async signUp(@Res({ passthrough: true }) response: Response, @Body() signUpDto: CreateUserDto) {

    const result = await this.authService.signUp(signUpDto)
    response.cookie('token', result.tokens.access, { httpOnly: true })

    return result
  }
}
