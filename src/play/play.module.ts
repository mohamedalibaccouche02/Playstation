import { Module } from '@nestjs/common';
import { PlayController } from './play.controller';
import { PlayService } from './play.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PlayController],
  providers: [PlayService, PrismaService],
})
export class PlayModule {}
