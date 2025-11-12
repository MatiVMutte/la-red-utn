import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum UsuarioRole {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

export class CreateUsuarioDto {
    
    @ApiProperty({
        description: 'Nombre del usuario',
        example: 'Juan',
        minLength: 2
    })
    @IsString()
    @IsNotEmpty({ message: 'El nombre es requerido' })
    @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
    nombre: string;

    @ApiProperty({
        description: 'Apellido del usuario',
        example: 'Pérez',
        minLength: 2
    })
    @IsString()
    @IsNotEmpty({ message: 'El apellido es requerido' })
    @MinLength(2, { message: 'El apellido debe tener al menos 2 caracteres' })
    apellido: string;

    @ApiProperty({
        description: 'Nombre de usuario único',
        example: 'juan123',
        minLength: 3
    })
    @IsString()
    @IsNotEmpty({ message: 'El username es requerido' })
    @MinLength(3, { message: 'El username debe tener al menos 3 caracteres' })
    username: string;

    @ApiProperty({
        description: 'Dirección de email única',
        example: 'juan@example.com',
        format: 'email'
    })
    @IsEmail({}, { message: 'El email debe ser válido' })
    @IsNotEmpty({ message: 'El email es requerido' })
    email: string;

    @ApiProperty({
        description: 'Contraseña del usuario (se almacenará hasheada)',
        example: 'MiPassword123',
        minLength: 8
    })
    @IsString()
    @IsNotEmpty({ message: 'La contraseña es requerida' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    password: string;

    @ApiProperty({
        description: 'Fecha de nacimiento del usuario',
        example: '1990-05-15',
        type: String,
        format: 'date'
    })
    @IsDateString({}, { message: 'La fecha de nacimiento debe ser una fecha válida' })
    @IsNotEmpty({ message: 'La fecha de nacimiento es requerida' })
    fechaNacimiento: string;

    @ApiProperty({
        description: 'Descripción breve del usuario',
        example: 'Desarrollador full stack apasionado por la tecnología',
        minLength: 10
    })
    @IsString()
    @IsNotEmpty({ message: 'La descripción es requerida' })
    @MinLength(10, { message: 'La descripción debe tener al menos 10 caracteres' })
    descripcion: string;

    @ApiProperty({
        description: 'URL de la imagen de perfil del usuario',
        example: 'https://example.com/profiles/user123.jpg',
        required: false
    })
    @IsString()
    @IsOptional()
    profileImageUrl?: string;

    @ApiProperty({
        description: 'Rol del usuario en el sistema',
        enum: UsuarioRole,
        default: 'USER',
        example: 'USER',
        required: false
    })
    @IsEnum(UsuarioRole, { message: 'El rol debe ser USER o ADMIN' })
    @IsOptional()
    role?: string;
}
