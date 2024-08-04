import { Controller, Get,Post , Param, UseGuards, Patch, Body, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get(':id')
  async getUserProfile(@Param('id') id: number) {
    return await this.userService.findByID(id);
  }

  @Patch(':id')
  async updateUserProfile(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return await this.userService.update(id, dto);
  }

  @UseGuards(JwtGuard)
  @Get('id:/token')
  getToken(@Req() request: Request) {
    return { token: this.userService.getTokenFromRequest(request) };
  }

 




}
