import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, HttpCode, HttpStatus, UseInterceptors, Query } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse as SwaggerResponse, ApiParam, ApiBody, ApiQuery } from "@nestjs/swagger";
import { ApiResponse } from "src/core/response/response";
import Usuario from "./domain/entities/usuario.entity";
import { CreateUsuarioDto, UpdateUsuarioDto } from "./infraestructure/dto";
import { UsuarioService } from "./usuario.service";


@ApiTags('usuario')
@Controller('usuario')
export class UsuarioController {

    constructor(
        private readonly usuarioService: UsuarioService
    ) {}

    @Get()
    @ApiOperation({ 
        summary: 'Listar todos los usuarios',
        description: 'Retorna una lista de todos los usuarios activos'
    })
    @SwaggerResponse({ status: 200, description: 'Lista de usuarios obtenida exitosamente' })
    async findAll(): Promise<ApiResponse<Usuario[]>> {
        const usuarios = await this.usuarioService.findAll();
        return ApiResponse.success(
            usuarios,
            usuarios.length > 0 ? 'Usuarios encontrados' : 'No hay usuarios registrados'
        );
    }

    @Get('email/:email')
    @ApiOperation({ summary: 'Buscar usuario por email', description: 'Busca y retorna un usuario específico por su dirección de email' })
    @ApiParam({ name: 'email', description: 'Email del usuario a buscar', example: 'usuario@example.com' })
    @SwaggerResponse({ status: 200, description: 'Usuario encontrado' })
    @SwaggerResponse({ status: 404, description: 'Usuario no encontrado' })
    async findByEmail(@Param('email') email: string): Promise<ApiResponse<Usuario | null>> {
        const usuario = await this.usuarioService.findByEmail(email);
        
        if (!usuario) {
            return ApiResponse.notFound('Usuario no encontrado');
        }
        
        return ApiResponse.success(
            usuario,
            'Usuario encontrado'
        );
    }

    @Get('username/:username')
    @ApiOperation({ summary: 'Buscar usuario por username', description: 'Busca y retorna un usuario específico por su nombre de usuario' })
    @ApiParam({ name: 'username', description: 'Nombre de usuario a buscar', example: 'juan123' })
    @SwaggerResponse({ status: 200, description: 'Usuario encontrado' })
    @SwaggerResponse({ status: 404, description: 'Usuario no encontrado' })
    async findByUsername(@Param('username') username: string): Promise<ApiResponse<Usuario | null>> {
        const usuario = await this.usuarioService.findByUsername(username);
        
        if (!usuario) {
            return ApiResponse.notFound('Usuario no encontrado');
        }
        
        return ApiResponse.success(
            usuario,
            'Usuario encontrado'
        );
    }

    @Get(':id')
    @ApiOperation({ summary: 'Buscar usuario por ID', description: 'Busca y retorna un usuario específico por su ID único' })
    @ApiParam({ name: 'id', description: 'UUID del usuario', example: '550e8400-e29b-41d4-a716-446655440000' })
    @SwaggerResponse({ status: 200, description: 'Usuario encontrado' })
    @SwaggerResponse({ status: 404, description: 'Usuario no encontrado' })
    async findById( @Param('id', ParseUUIDPipe) id: string): Promise<ApiResponse<Usuario>> {
        const usuario = await this.usuarioService.findById(id);
        return ApiResponse.success(
            usuario,
            'Usuario encontrado'
        );
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Crear nuevo usuario', description: 'Crea un nuevo usuario en el sistema con validación de email y username únicos. La contraseña se hashea automáticamente.' })
    @ApiBody({ type: CreateUsuarioDto, description: 'Datos del usuario a crear' })
    @SwaggerResponse({ status: 201, description: 'Usuario creado exitosamente' })
    @SwaggerResponse({ status: 400, description: 'Datos de entrada inválidos' })
    @SwaggerResponse({ status: 409, description: 'Email o username ya registrado' })
    async create( @Body() createUsuarioDto: CreateUsuarioDto ): Promise<ApiResponse<Usuario>> {
        const nuevoUsuario = await this.usuarioService.create(createUsuarioDto);
        return ApiResponse.success(
            nuevoUsuario,
            'Usuario creado exitosamente'
        );
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar usuario', description: 'Actualiza los datos de un usuario existente. Solo se actualizan los campos proporcionados. Si se actualiza la contraseña, se hashea automáticamente.' })
    @ApiParam({ name: 'id', description: 'UUID del usuario a actualizar', example: '550e8400-e29b-41d4-a716-446655440000' })
    @ApiBody({ type: UpdateUsuarioDto, description: 'Campos del usuario a actualizar (todos opcionales)' })
    @SwaggerResponse({ status: 200, description: 'Usuario actualizado exitosamente' })
    @SwaggerResponse({ status: 400, description: 'Datos de entrada inválidos' })
    @SwaggerResponse({ status: 404, description: 'Usuario no encontrado' })
    @SwaggerResponse({ status: 409, description: 'Email o username ya en uso por otro usuario' })
    async update(
        @Param('id', ParseUUIDPipe) id: string, 
        @Body() updateUsuarioDto: UpdateUsuarioDto
    ): Promise<ApiResponse<Usuario>> {
        const usuario = await this.usuarioService.update(id, updateUsuarioDto);
        return ApiResponse.success(
            usuario,
            'Usuario actualizado exitosamente'
        );
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Eliminar usuario (soft delete)', description: 'Marca el usuario como eliminado sin borrarlo permanentemente. El usuario puede ser restaurado posteriormente.' })
    @ApiParam({ name: 'id', description: 'UUID del usuario a eliminar', example: '550e8400-e29b-41d4-a716-446655440000' })
    @SwaggerResponse({ status: 204, description: 'Usuario eliminado exitosamente' })
    @SwaggerResponse({ status: 404, description: 'Usuario no encontrado' })
    async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        await this.usuarioService.delete(id);
    }

    @Patch(':id/restore')
    @ApiOperation({ summary: 'Restaurar usuario eliminado', description: 'Restaura un usuario que fue eliminado previamente mediante soft delete' })
    @ApiParam({ name: 'id', description: 'UUID del usuario a restaurar', example: '550e8400-e29b-41d4-a716-446655440000' })
    @SwaggerResponse({ status: 200, description: 'Usuario restaurado exitosamente' })
    @SwaggerResponse({ status: 404, description: 'Usuario no encontrado' })
    @SwaggerResponse({ status: 409, description: 'El usuario no está eliminado' })
    async restore(@Param('id', ParseUUIDPipe) id: string): Promise<ApiResponse<Usuario>> {
        const usuario = await this.usuarioService.restore(id);
        return ApiResponse.success(
            usuario,
            'Usuario restaurado exitosamente'
        );
    }
}
