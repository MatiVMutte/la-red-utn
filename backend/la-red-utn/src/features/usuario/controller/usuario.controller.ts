import { Controller, Get, Param } from '@nestjs/common';
import Usuario from '../domain/entities/usuario.entitie';
import UsuarioRepositorieImpl from '../infraestructure/repositories/usuario.repositorie.impl';
import { ApiResponse } from '../../../core/response/response';

@Controller('usuario')
export class UsuarioController {

    constructor(
        private readonly usuarioRepositorieImpl: UsuarioRepositorieImpl
    ) {}

    @Get()
    async findAll(): Promise<ApiResponse<Usuario[]>> {
        const usuarios = await this.usuarioRepositorieImpl.findAll();
        return ApiResponse.success(
            usuarios,
            usuarios.length > 0 ? 'Usuarios encontrados' : 'No hay usuarios registrados'
        );
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<ApiResponse<Usuario | null>> {
        const usuario = await this.usuarioRepositorieImpl.findById(id);
        
        if (!usuario) {
            return ApiResponse.notFound('Usuario no encontrado');
        }
        
        return ApiResponse.success(
            usuario,
            'Usuario encontrado'
        );
    }
}
