import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTarifDto } from './dto/create-tarif.dto';
import { UpdateTarifDto } from './dto/update-tarif.dto';

@Injectable()
export class TarifService {
  constructor(private prisma: PrismaService) {}

  async create(createTarifDto: CreateTarifDto) {
    return this.prisma.tarif.create({
      data: {
        ...createTarifDto,
        duration: Number(createTarifDto.duration),  // Ensure duration is a number
      },
    });
  }

  async findAll() {
    return this.prisma.tarif.findMany();
  }

  async findOne(id: number) {
    const tarif = await this.prisma.tarif.findUnique({
      where: { id },
    });

    if (!tarif) throw new NotFoundException('Tarif not found');

    return tarif;
  }

  async update(id: number, updateTarifDto: UpdateTarifDto) {
    const tarif = await this.prisma.tarif.update({
      where: { id },
      data: {
        ...updateTarifDto,
        duration: updateTarifDto.duration ? Number(updateTarifDto.duration) : undefined,  // Ensure duration is a number
      },
    });

    if (!tarif) throw new NotFoundException('Tarif not found');

    return tarif;
  }

  async remove(id: number) {
    const tarif = await this.prisma.tarif.delete({
      where: { id },
    });

    if (!tarif) throw new NotFoundException('Tarif not found');

    return tarif;
  }
}
