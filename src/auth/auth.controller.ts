import { Body, Controller, Post, Request, UseGuards ,Res} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from './guards/refresh.guards';
import * as cookieParser from 'cookie-parser';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private userService: UserService,private authService: AuthService) {}
@Post('register')
async registerUser(@Body() dto:CreateUserDto ) {
    return await this.userService.create(dto)
}

@Post('login')
async Login(@Body() dto:LoginDto ) {
    return await this.authService.login(dto)
} 
@UseGuards(RefreshJwtGuard)
@Post('refresh')
async Refresh(@Request() req ) {
console.log('refreshed');

    return await this.authService.refreshToken(req.user);
}

@Post('logout')
async logout(@Res() response: Response) {
  response.clearCookie('token'); // Assuming token is stored in a cookie named 'token'
  return response.status(200).send({ message: 'Logged out successfully' });
}
  

}