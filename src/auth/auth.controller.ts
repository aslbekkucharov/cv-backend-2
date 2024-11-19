import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';

import SignInDto from './dto/signin.dto';
import { Public } from './public-strategy';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/common/dto/create-user.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Public()
    @Post('signin')
    @UsePipes(new ValidationPipe())
    signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto)
    }

    @Public()
    @Post('signup')
    @UsePipes(new ValidationPipe())
    signUp(@Body() signUpDto: CreateUserDto) {
        return this.authService.signUp(signUpDto)
    }
}