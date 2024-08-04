import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'bcrypt';
import { Request } from 'express';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreateUserDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });

        if (user) throw new ConflictException('Email already exists');

        const newUser = await this.prisma.user.create({
            data: {
                ...dto,
                password: await hash(dto.password, 10),
            },
        });

        const { password, ...result } = newUser;
        return result;
    }

    async findByEmail(email: string) {
        return await this.prisma.user.findUnique({
            where: {
                email: email,
            },
        });
    }

    async findByID(id: number) {
        return await this.prisma.user.findUnique({
            where: {
                id: Number(id), // Ensure the ID is a number
            },
        });
    }

    async update(id: number, dto: UpdateUserDto) {
        const user = await this.prisma.user.findUnique({ where: { id } });

        if (!user) throw new NotFoundException('User not found');

        const updateData: any = { ...dto };

        if (dto.password) {
            updateData.password = await hash(dto.password, 10);
        }

        return await this.prisma.user.update({
            where: { id },
            data: updateData,
        });
    }
   




}