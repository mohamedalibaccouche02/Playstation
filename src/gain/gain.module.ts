import { Module } from '@nestjs/common';
import { GainController } from './gain.controller';
import { GainService } from './gain.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [GainController],
  providers: [GainService,PrismaService]
})
export class GainModule {}
