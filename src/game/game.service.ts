import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GameService {
  constructor(private prisma: PrismaService) {}

  async create(createGameDto: CreateGameDto) {
    return await this.prisma.game.create({
      data: createGameDto,
    });
  }

  async findAll() {
    return await this.prisma.game.findMany();
  }

  async findOne(id: number) {
    const game = await this.prisma.game.findUnique({
      where: { id },
    });

    if (!game) throw new NotFoundException('Game not found');

    return game;
  }

  async update(id: number, updateGameDto: UpdateGameDto) {
    const game = await this.prisma.game.update({
      where: { id },
      data: updateGameDto,
    });

    if (!game) throw new NotFoundException('Game not found');

    return game;
  }

  async remove(id: number) {
    const game = await this.prisma.game.delete({
      where: { id },
    });

    if (!game) throw new NotFoundException('Game not found');

    return game;
  }
}
