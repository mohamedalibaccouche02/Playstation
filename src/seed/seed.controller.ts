// seed.controller.ts
import { Controller, Post } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post('admin')
  async seedAdmin() {
    await this.seedService.seedAdmin();
    return 'Admin user seeding completed';
  }
}
