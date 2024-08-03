import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from './guards/refresh.guards';

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
  

}