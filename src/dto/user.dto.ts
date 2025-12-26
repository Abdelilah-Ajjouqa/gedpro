import { IsEmail, IsString, IsInt, Min, Max, IsOptional, MinLength, IsBoolean } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(2)
    firstName: string;

    @IsString()
    @MinLength(2)
    lastName: string;
}

export class UpdateUserDto {
    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    firstName?: string;

    @IsOptional()
    @IsString()
    lastName?: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}

export class UserResponseDto {
    id: string;
    email: string;
    firstName: string;
    lastName: string
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}