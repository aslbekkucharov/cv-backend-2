import { AuthGuard } from '@nestjs/passport'
import { Controller, Post, Request, UseGuards } from '@nestjs/common'

import { AuthService } from '@/auth/auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signin')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req) {
    return req.user
  }

}
