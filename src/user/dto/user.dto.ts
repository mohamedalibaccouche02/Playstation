import { IsEmail, IsString, IsIn, IsOptional } from 'class-validator';

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    @IsIn(['Admin', 'User'])
    role: string;
}
