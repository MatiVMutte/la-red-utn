import { IsEmail, IsString, MinLength, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { UsuarioRole } from './create-usuario.dto';

export class UpdateUsuarioDto {
    
    @ApiPropertyOptional({
        description: 'Nombre del usuario',
        example: 'Juan',
        minLength: 2
    })
    @IsOptional()
    @IsString()
    @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
    nombre?: string;

    @ApiPropertyOptional({
        description: 'Apellido del usuario',
        example: 'Pérez',
        minLength: 2
    })
    @IsOptional()
    @IsString()
    @MinLength(2, { message: 'El apellido debe tener al menos 2 caracteres' })
    apellido?: string;

    @ApiPropertyOptional({
        description: 'Nombre de usuario único',
        example: 'juan123',
        minLength: 3
    })
    @IsOptional()
    @IsString()
    @MinLength(3, { message: 'El username debe tener al menos 3 caracteres' })
    username?: string;

    @ApiPropertyOptional({
        description: 'Dirección de email única',
        example: 'juan@example.com',
        format: 'email'
    })
    @IsOptional()
    @IsEmail({}, { message: 'El email debe ser válido' })
    email?: string;

    @ApiPropertyOptional({
        description: 'Nueva contraseña del usuario (se almacenará hasheada)',
        example: 'NuevaPassword456',
        minLength: 8
    })
    @IsOptional()
    @IsString()
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    password?: string;

    @ApiPropertyOptional({
        description: 'Fecha de nacimiento del usuario',
        example: '1990-05-15',
        type: String,
        format: 'date'
    })
    @IsOptional()
    @IsDateString({}, { message: 'La fecha de nacimiento debe ser una fecha válida' })
    fechaNacimiento?: string;

    @ApiPropertyOptional({
        description: 'Descripción breve del usuario',
        example: 'Desarrollador full stack apasionado por la tecnología',
        minLength: 10
    })
    @IsOptional()
    @IsString()
    @MinLength(10, { message: 'La descripción debe tener al menos 10 caracteres' })
    descripcion?: string;

    @ApiPropertyOptional({
        description: 'URL de la imagen de perfil del usuario',
        example: 'https://example.com/profiles/user123.jpg'
    })
    @IsOptional()
    @IsString()
    profileImageUrl?: string;

    @ApiPropertyOptional({
        description: 'Rol del usuario en el sistema',
        enum: UsuarioRole,
        example: 'USER'
    })
    @IsOptional()
    @IsEnum(UsuarioRole, { message: 'El rol debe ser USER o ADMIN' })
    role?: string;
}
