import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import UsuarioRepositorieImpl from './infraestructure/repositories/usuario.repositorie.impl';
import Usuario from './domain/entities/usuario.entity';
import { CreateUsuarioDto, UpdateUsuarioDto } from './infraestructure/dto';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {

    constructor(
        private readonly usuarioRepositorie: UsuarioRepositorieImpl
    ) {}

    /**
     * Obtiene todos los usuarios (excluye eliminados)
     */
    async findAll(): Promise<Usuario[]> {
        const usuarios = await this.usuarioRepositorie.findAll();
        return usuarios.filter(u => !u.deletedAt);
    }

    /**
     * Busca un usuario por ID (excluye eliminados)
     * @throws NotFoundException si el usuario no existe
     */
    async findById(id: string): Promise<Usuario> {
        const usuario = await this.usuarioRepositorie.findById(id);
        
        if (!usuario || usuario.deletedAt) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        
        return usuario;
    }

    /**
     * Busca un usuario por email (excluye eliminados)
     */
    async findByEmail(email: string): Promise<Usuario | null> {
        const usuario = await this.usuarioRepositorie.findByEmail(email);
        return usuario && !usuario.deletedAt ? usuario : null;
    }

    /**
     * Busca un usuario por username (excluye eliminados)
     */
    async findByUsername(username: string): Promise<Usuario | null> {
        const usuario = await this.usuarioRepositorie.findByUsername(username);
        return usuario && !usuario.deletedAt ? usuario : null;
    }

    /**
     * Crea un nuevo usuario
     * @throws ConflictException si el email o username ya existen
     */
    async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
        // Validar que el email no exista
        const emailExistente = await this.usuarioRepositorie.findByEmail(createUsuarioDto.email);
        if (emailExistente) {
            throw new ConflictException('El email ya está registrado');
        }

        // Validar que el username no exista
        const usernameExistente = await this.usuarioRepositorie.findByUsername(createUsuarioDto.username);
        if (usernameExistente) {
            throw new ConflictException('El username ya está en uso');
        }

        // Hashear la contraseña con bcrypt (10 rounds de salt)
        const hashedPassword = await bcrypt.hash(createUsuarioDto.password, 10);

        // Crear el usuario
        const nuevoUsuario: Usuario = {
            id: uuid(),
            nombre: createUsuarioDto.nombre,
            apellido: createUsuarioDto.apellido,
            username: createUsuarioDto.username,
            email: createUsuarioDto.email,
            password: hashedPassword,
            fechaNacimiento: new Date(createUsuarioDto.fechaNacimiento),
            descripcion: createUsuarioDto.descripcion,
            profileImageUrl: createUsuarioDto.profileImageUrl,
            role: createUsuarioDto.role || 'USER',
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null
        };

        return await this.usuarioRepositorie.create(nuevoUsuario);
    }

    /**
     * Actualiza un usuario existente
     * @throws NotFoundException si el usuario no existe
     * @throws ConflictException si el email o username ya existen
     */
    async update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
        // Verificar que el usuario existe
        const usuarioExistente = await this.usuarioRepositorie.findById(id);
        if (!usuarioExistente) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }

        // Si se actualiza el email, validar que no esté en uso por otro usuario
        if (updateUsuarioDto.email && updateUsuarioDto.email !== usuarioExistente.email) {
            const emailEnUso = await this.usuarioRepositorie.findByEmail(updateUsuarioDto.email);
            if (emailEnUso && emailEnUso.id !== id) {
                throw new ConflictException('El email ya está registrado por otro usuario');
            }
        }

        // Si se actualiza el username, validar que no esté en uso por otro usuario
        if (updateUsuarioDto.username && updateUsuarioDto.username !== usuarioExistente.username) {
            const usernameEnUso = await this.usuarioRepositorie.findByUsername(updateUsuarioDto.username);
            if (usernameEnUso && usernameEnUso.id !== id) {
                throw new ConflictException('El username ya está en uso por otro usuario');
            }
        }

        // Si se actualiza la contraseña, hashearla
        let passwordActualizada = usuarioExistente.password;
        if (updateUsuarioDto.password) {
            passwordActualizada = await bcrypt.hash(updateUsuarioDto.password, 10);
        }

        // Construir el usuario actualizado
        const usuarioActualizado: Usuario = {
            ...usuarioExistente,
            id,
            username: updateUsuarioDto.username || usuarioExistente.username,
            email: updateUsuarioDto.email || usuarioExistente.email,
            password: passwordActualizada,
            role: updateUsuarioDto.role || usuarioExistente.role,
            updatedAt: new Date()
        };

        return await this.usuarioRepositorie.update(usuarioActualizado);
    }

    /**
     * Elimina un usuario por ID (soft delete)
     * @throws NotFoundException si el usuario no existe o ya está eliminado
     */
    async delete(id: string): Promise<void> {
        // Verificar que el usuario existe y no está eliminado
        const usuarioExistente = await this.usuarioRepositorie.findById(id);
        if (!usuarioExistente || usuarioExistente.deletedAt) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }

        // Soft delete: marcar como eliminado
        const usuarioEliminado: Usuario = {
            ...usuarioExistente,
            deletedAt: new Date(),
            updatedAt: new Date()
        };

        await this.usuarioRepositorie.update(usuarioEliminado);
    }

    /**
     * Restaura un usuario eliminado
     * @throws NotFoundException si el usuario no existe
     */
    async restore(id: string): Promise<Usuario> {
        const usuario = await this.usuarioRepositorie.findById(id);
        
        if (!usuario) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }

        if (!usuario.deletedAt) {
            throw new ConflictException('El usuario no está eliminado');
        }

        // Restaurar usuario
        const usuarioRestaurado: Usuario = {
            ...usuario,
            deletedAt: null,
            updatedAt: new Date()
        };

        return await this.usuarioRepositorie.update(usuarioRestaurado);
    }

    /**
     * Elimina permanentemente un usuario (hard delete)
     * Solo usar en casos excepcionales
     * @throws NotFoundException si el usuario no existe
     */
    async hardDelete(id: string): Promise<void> {
        const usuario = await this.usuarioRepositorie.findById(id);
        
        if (!usuario) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }

        await this.usuarioRepositorie.delete(id);
    }

    /**
     * Verifica si una contraseña coincide con el hash almacenado
     * Útil para autenticación
     */
    async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
}
