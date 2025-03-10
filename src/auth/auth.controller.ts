import { Request } from 'express'
import { AuthGuard } from '@nestjs/passport'
import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common'

import { RequestUser } from '@/types'
import { UAParser } from 'ua-parser-js'
import { AuthService } from '@/auth/auth.service'
import { SignUpDto } from '@/auth/dto/signup.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  async signIn(@Req() req: Request) {
    const ua = req.headers['user-agent']
    const result = await this.authService.signIn(req.user as RequestUser)

    const data = UAParser(ua)

    return {
      accessToken: result.accessToken
    }
  }

  @Post('signup')
  async signUp(@Body() payload: SignUpDto, @Req() req: Request) {
    const tokens = await this.authService.signUp(payload)

    return {
      accessToken: tokens.accessToken
    }
  }
}
