import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { SeedModule } from './seed/seed.module';
import { PlayModule } from './play/play.module';
import { GameModule } from './game/game.module';
import { TarifModule } from './tarif/tarif.module';
import { GainModule } from './gain/gain.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule, SeedModule, PlayModule, GameModule, TarifModule, GainModule],
  controllers: [AppController],
  providers: [AppService,PrismaService],
})
export class AppModule {}
