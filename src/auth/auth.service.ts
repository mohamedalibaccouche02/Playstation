import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private userService: UserService
        ,private jwtService: JwtService
    ) {}

async login(dto:LoginDto ) {
    const user = await this.ValidateUser(dto)

    const payload = { username: user.email,
         sub: {
             name: user.name,
         }  }

    return {
        user,
        backendTokens:{
            accessToken:await this.jwtService.signAsync(payload,{
                expiresIn:'20s',
                secret:process.env.jwtSecretKey,
            }),
            refreshToken:await this.jwtService.signAsync(payload,{
                expiresIn:'7d',
                secret:process.env.jwtRefreshTokenKey,
            }),
        }
    }

}
    
    
    async ValidateUser(dto:LoginDto ) {
        const user = await this.userService.findByEmail(dto.username)
        
        if(user && (await compare(dto.password, user.password))){
            const { password, ...result } = user;
            return result;
        }
        throw new UnauthorizedException('Wrong credentials')
        }

async refreshToken(user:any) {
    
    const payload = { username: user.username,
        sub:user.sub,
         };

    return {
        accessToken:await this.jwtService.signAsync(payload,{
            expiresIn:'20s',
            secret:process.env.jwtSecretKey,
        }),
        refreshToken:await this.jwtService.signAsync(payload,{
            expiresIn:'7d',
            secret:process.env.jwtRefreshTokenKey,
        }),

    }}
}
