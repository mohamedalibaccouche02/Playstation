import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateGainDto } from './dto/create-gain.dto';

@Injectable()
export class GainService {
  constructor(private prisma: PrismaService) {}

  async create(createGainDto: CreateGainDto) {
    return this.prisma.gain.create({
      data: createGainDto,
    });
  }

  async findAll() {
    return this.prisma.gain.findMany({
      include: {
        game: true,
        tarif: true,
      },
    });
  }

  async findOne(id: number) {
    const gain = await this.prisma.gain.findUnique({
      where: { id },
      include: {
        game: true,
        tarif: true,
      },
    });

    if (!gain) throw new NotFoundException('Gain record not found');

    return gain;
  }

  async calculateGain(id: number) {
    const gain = await this.findOne(id);

    if (!gain) throw new NotFoundException('Gain record not found');

    const { game, tarif, liveGames, totalGames, liveDuration, totalDuration } = gain;

    let calculatedGain = 0;

    if (game.title.toLowerCase().includes('fifa') || game.title.toLowerCase().includes('pes')) {
      // Calculate gain based on match type and price for games like Fifa and PES
      calculatedGain = (totalGames ?? 0) * (tarif.price ?? 0);
    } else {
      // Calculate gain based on duration for other games
      calculatedGain = (totalDuration ?? 0) * (tarif.price ?? 0);
    }

    return {
      gameTitle: game.title,
      calculatedGain,
      liveGames,
      totalGames,
      liveDuration,
      totalDuration,
    };
  }

  async update(id: number, createGainDto: CreateGainDto) {
    const gain = await this.prisma.gain.update({
      where: { id },
      data: createGainDto,
    });

    if (!gain) throw new NotFoundException('Gain record not found');

    return gain;
  }

  async remove(id: number) {
    const gain = await this.prisma.gain.delete({
      where: { id },
    });

    if (!gain) throw new NotFoundException('Gain record not found');

    return gain;
  }
}
