import { omit } from 'lodash'
import { compare, hash } from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { AuthResponse } from './types';
import { TokenPayload } from 'src/types';
import SignInDto from './dto/signin.dto';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/common/dto/create-user.dto';

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService, private usersService: UsersService, private configService: ConfigService) { }

    async signIn(payload: SignInDto): Promise<AuthResponse> {
        const user = await this.usersService.findOne(payload.username, ['password'])

        if (!user) throw new NotFoundException('Пользователь не найден')

        const isPasswordMatch = await compare(payload.password, user.password)

        if (!isPasswordMatch) {
            throw new UnauthorizedException('Имя пользователя или пароль неверны')
        }

        const omittedUserObject = omit(user, ['password'])

        const tokenPayload: TokenPayload = { ...omittedUserObject }
        const token = await this.jwtService.signAsync(tokenPayload)

        return {
            user: omittedUserObject,
            tokens: { access: token }
        }
    }

    async signUp(payload: CreateUserDto): Promise<AuthResponse> {

        const { username, password } = payload

        const isUsernameInUse = await this.usersService.findOne(username)

        if (!!isUsernameInUse) {
            throw new BadRequestException('Указанное имя пользователя уже используется')
        }

        const hashedPassword = await hash(password, +this.configService.get<number>('HASH_SALT'))

        const createdUser = await this.usersService.create({ ...payload, password: hashedPassword })
        const omittedUser = omit(createdUser, ['password'])
        const token = await this.jwtService.signAsync(omit(payload, ['password']))

        return {
            user: omittedUser,
            tokens: { access: token }
        }
    }
}
