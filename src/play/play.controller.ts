import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PlayService } from './play.service';
import { CreatePlayDto } from './dto/play.dto';
import { UpdatePlayDto } from './dto/update-play.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';  // Adjust the path according to your structure

@Controller('play')
@UseGuards(JwtGuard)  // Apply JwtGuard to all routes in this controller
export class PlayController {
  constructor(private readonly playService: PlayService) {}

  @Post()
  create(@Body() createPlayDto: CreatePlayDto) {
    return this.playService.create(createPlayDto);
  }

  @Get()
  findAll() {
    return this.playService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlayDto: UpdatePlayDto) {
    return this.playService.update(+id, updatePlayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playService.remove(+id);
  }
}
