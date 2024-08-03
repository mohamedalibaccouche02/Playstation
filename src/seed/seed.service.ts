// seed.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; // Adjust the path as necessary
import { CreateUserDto } from '../user/dto/user.dto'; // Adjust the path as necessary
import { hash } from 'bcrypt';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    await this.seedAdmin();
  }

  async seedAdmin() {
    const seedAdminDto: CreateUserDto = {
      email: 'admin@admin.com',
      password: 'admin', // Change this to a secure password
      name: 'Admin',
      role: 'Admin',
    };

    const existingAdmin = await this.prisma.user.findUnique({
      where: { email: seedAdminDto.email },
    });

    if (!existingAdmin) {
      const hashedPassword = await hash(seedAdminDto.password, 10);
      await this.prisma.user.create({
        data: {
          email: seedAdminDto.email,
          password: hashedPassword,
          name: seedAdminDto.name,
          role: seedAdminDto.role,
        },
      });
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }
  }
}
