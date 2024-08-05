import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePlayDto } from './dto/play.dto';
import { UpdatePlayDto } from './dto/update-play.dto';

@Injectable()
export class PlayService {
  constructor(private prisma: PrismaService) {}

  async create(createPlayDto: CreatePlayDto) {
    const { gameIds, ...data } = createPlayDto;
  
    const play = await this.prisma.play.create({
      data: {
        ...data,
        games: {
          connect: gameIds?.map((id) => ({ id })), // Use id instead of title
        },
      },
      include: {
        games: true,
      },
    });
  
    return play;
  }

  async findAll() {
    return this.prisma.play.findMany({
      include: {
        games: true,
      },
    });
  }

  async findOne(id: number) {
    const play = await this.prisma.play.findUnique({
      where: { id },
      include: {
        games: true,
      },
    });

    if (!play) throw new NotFoundException('Play not found');

    return play;
  }

  async update(id: number, updatePlayDto: UpdatePlayDto) {
    const { gameIds, ...data } = updatePlayDto;
  
    const play = await this.prisma.play.update({
      where: { id },
      data: {
        ...data,
        games: {
          connect: gameIds?.map((id) => ({ id })), // Use id instead of title
        },
      },
      include: {
        games: true,
      },
    });
  
    if (!play) throw new NotFoundException('Play not found');
  
    return play;
  }
  

  async remove(id: number) {
    const play = await this.prisma.play.delete({
      where: { id },
    });

    if (!play) throw new NotFoundException('Play not found');

    return play;
  }
}
