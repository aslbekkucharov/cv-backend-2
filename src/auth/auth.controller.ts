import { randomInt } from 'crypto'
import { UAParser } from 'ua-parser-js'
import { Request, Response } from 'express'
import { AuthGuard } from '@nestjs/passport'
import { Controller, Post, UseGuards, Req, Body, Res, UnauthorizedException, InternalServerErrorException, UsePipes, ValidationPipe } from '@nestjs/common'

import { RequestUser } from '@/types'
import { AuthService } from '@/auth/auth.service'
import { SignUpDto } from '@/auth/dto/signup.dto'
import { UsersService } from '@/users/users.service'
import { EmailService } from '@/email/email.service'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly emailService: EmailService
  ) {}

  private setAuthCookies(res: Response, refreshToken: string) {
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true })
  }

  private getUserAgent(req: Request) {
    const ua = req.headers['user-agent']
    const parser = new UAParser(ua)

    return `${parser.getBrowser().name || 'Unknown'} on ${parser.getOS().name || 'Unknown'}`
  }

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  async signIn(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    const device = this.getUserAgent(req)
    const tokens = await this.authService.signIn(req.user as RequestUser, device)

    this.setAuthCookies(res, tokens.refreshToken)

    return {
      accessToken: tokens.accessToken
    }
  }

  @Post('signup')
  @UsePipes(new ValidationPipe())
  async signUp(@Req() req: Request, @Res({ passthrough: true }) res: Response, @Body() payload: SignUpDto) {
    const device = this.getUserAgent(req)

    const tokens = await this.authService.signUp(payload, device)

    await this.emailService.sendEmailConfirmation({
      otp: 122233,
      expiryTime: '30',
      companyName: 'CV Generator',
      user: { name: payload.name, email: payload.email },
      companyLogo: 'https://www.spcdn.org/images/promo-logo/correct/sendpulse-logo.svg'
    })

    this.setAuthCookies(res, tokens.refreshToken)

    return {
      accessToken: tokens.accessToken
    }
  }

  @Post('refresh')
  async updateTokens(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const currentRefreshToken = req.cookies['refreshToken']

    if (!currentRefreshToken) {
      throw new UnauthorizedException({ error: 'invalid_refresh_token', message: 'Невалидный refresh токен.' })
    }

    const device = this.getUserAgent(req)
    const oldSession = await this.authService.getSessionByRefreshToken(currentRefreshToken)

    if (!oldSession || !oldSession.isActive) {
      throw new UnauthorizedException({ error: 'invalid_refresh_token', message: 'Невалидный refresh токен.' })
    }

    const user = await this.usersService.findOneById(oldSession.userId)

    if (!user) {
      throw new InternalServerErrorException({ error: 'something_wrong', message: 'Что-то пошло не так' })
    }

    const tokens = await this.authService.rotateAndGenerateTokens(currentRefreshToken, { userId: user?.id, username: user?.username }, device)

    this.setAuthCookies(res, tokens.refreshToken)

    return {
      accessToken: tokens.accessToken
    }
  }
}
