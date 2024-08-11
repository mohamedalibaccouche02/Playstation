import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { GainService } from './gain.service';
import { CreateGainDto } from './dto/create-gain.dto';
// import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('gain')
// @UseGuards(JwtGuard)
export class GainController {
  constructor(private readonly gainService: GainService) {}

  @Post()
  create(@Body() createGainDto: CreateGainDto) {
    return this.gainService.create(createGainDto);
  }

  @Get()
  findAll() {
    return this.gainService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gainService.findOne(+id);
  }

  @Get(':id/calculate')
  calculateGain(@Param('id') id: string) {
    return this.gainService.calculateGain(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() createGainDto: CreateGainDto) {
    return this.gainService.update(+id, createGainDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gainService.remove(+id);
  }
}
