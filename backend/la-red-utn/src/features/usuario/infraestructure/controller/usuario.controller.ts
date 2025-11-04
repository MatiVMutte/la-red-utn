import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import UsuarioRepositorieImpl from "../repositories/usuario.repositorie.impl";
import { ApiResponse } from "src/core/response/response";
import Usuario from "../../domain/entities/usuario.entitie";


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

    @Post()
    async create( @Body() body: Usuario ) {
        const usuario = await this.usuarioRepositorieImpl.create(body);
        return ApiResponse.success(
            usuario,
            'Usuario creado'
        );
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() body: Usuario) {
        body.id = id;
        const usuario = await this.usuarioRepositorieImpl.update(body);
        return ApiResponse.success(
            usuario,
            'Usuario actualizado'
        );
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        const usuario = await this.usuarioRepositorieImpl.delete(id);
        return ApiResponse.success(
            usuario,
            'Usuario eliminado'
        );
    }
}
