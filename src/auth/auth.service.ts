import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
    private invalidatedTokens: Set<string> = new Set();

    constructor(private userService: UserService, private jwtService: JwtService) {}

    async login(dto: LoginDto) {
        const user = await this.ValidateUser(dto);

        const payload = {
            username: user.email,
            sub: {
                name: user.name,
            },
        };

        return {
            user,
            backendTokens: {
                accessToken: await this.jwtService.signAsync(payload, {
                    expiresIn: '1d',
                    secret: process.env.jwtSecretKey,
                }),
                refreshToken: await this.jwtService.signAsync(payload, {
                    expiresIn: '2d',
                    secret: process.env.jwtRefreshTokenKey,
                }),
            },
        };
    }

    async ValidateUser(dto: LoginDto) {
        const user = await this.userService.findByEmail(dto.username);

        if (user && (await compare(dto.password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        throw new UnauthorizedException('Wrong credentials');
    }

    async refreshToken(user: any) {
        const payload = {
            username: user.username,
            sub: user.sub,
        };

        return {
            accessToken: await this.jwtService.signAsync(payload, {
                expiresIn: '1d',
                secret: process.env.jwtSecretKey,
            }),
            refreshToken: await this.jwtService.signAsync(payload, {
                expiresIn: '2d',
                secret: process.env.jwtRefreshTokenKey,
            }),
        };
    }

    async getUserFromToken(token: string) {
        if (this.invalidatedTokens.has(token)) {
            throw new UnauthorizedException('Token has been invalidated');
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.jwtSecretKey,
            });
            const user = await this.userService.findByEmail(payload.username);
            if (!user) {
                throw new UnauthorizedException('User not found');
            }
            const { password, ...result } = user;
            return result;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }

    async logout(token: string) {
        this.invalidatedTokens.add(token);
    }
}
