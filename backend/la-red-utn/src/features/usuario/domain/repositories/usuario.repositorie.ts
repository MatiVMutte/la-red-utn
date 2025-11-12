import Usuario from "../entities/usuario.entity";

interface UsuarioRepositorie {

    findAll(): Promise<Usuario[]>;
    
    findById(id: string): Promise<Usuario | null>;

    create(usuario: Usuario): Promise<Usuario>;
    
    update(usuario: Usuario): Promise<Usuario>;
    
    delete(id: string): Promise<Usuario[]>;
    
    findByEmail(email: string): Promise<Usuario | null>;
    
    findByUsername(username: string): Promise<Usuario | null>;
}

export default UsuarioRepositorie;
