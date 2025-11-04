import { Injectable, Inject } from "@nestjs/common";
import Usuario from "../../domain/entities/usuario.entitie";
import UsuarioRepositorie from "../../domain/repositories/usuario.repositorie";
import type UsuarioDataSource from "../../domain/datasources/usuario.datasource.mongodb";

@Injectable()
class UsuarioRepositorieImpl implements UsuarioRepositorie {

    constructor(
        private readonly usuarioDataSource: UsuarioDataSource
    ) {}

    findAll(): Promise<Usuario[]> {
        return this.usuarioDataSource.findAll();
    }
    findById(id: string): Promise<Usuario | null> {
        return this.usuarioDataSource.findById(id);
    }
    create(usuario: Usuario): Promise<Usuario> {
        return this.usuarioDataSource.create(usuario);
    }
    update(usuario: Usuario): Promise<Usuario> {
        return this.usuarioDataSource.update(usuario);
    }
    delete(id: string): Promise<Usuario[]> {
        return this.usuarioDataSource.delete(id);
    }
    findByEmail(email: string): Promise<Usuario | null> {
        return this.usuarioDataSource.findByEmail(email);
    }
    findByUsername(username: string): Promise<Usuario | null> {
        return this.usuarioDataSource.findByUsername(username);
    }
    
}

export default UsuarioRepositorieImpl;
