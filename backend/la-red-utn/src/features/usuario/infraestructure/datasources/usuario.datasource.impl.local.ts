import UsuarioDataSource from "../../domain/datasources/usuario.datasource.mongodb";
import Usuario from "../../domain/entities/usuario.entitie";

class UsuarioDataSourceImplLocal implements UsuarioDataSource {

    // Implementacion de metodos
    findAll(): Promise<Usuario[]> {
        return Promise.resolve(usuarioData);
    }

    findById(id: string): Promise<Usuario | null> {
        return Promise.resolve(
            usuarioData.find((usuario) => usuario.id === id) ?? null
        );
    }

    create(usuario: Usuario): Promise<Usuario> {
        usuarioData = [...usuarioData, usuario];
        return Promise.resolve(usuario);
    }

    update(usuario: Usuario): Promise<Usuario> {
        const index = usuarioData.findIndex((u) => u.id === usuario.id);
        if (index !== -1) {
            usuarioData[index] = usuario;
            return Promise.resolve( usuarioData[index] );
        }
        return Promise.reject(new Error("Usuario no encontrado"));
    }

    delete(id: string): Promise<Usuario[]> {
        const index = usuarioData.findIndex((usuario) => usuario.id === id);
        if (index === -1) {
            return Promise.reject(new Error("Usuario no encontrado"));
        }
        usuarioData.splice(index, 1);
        return Promise.resolve(usuarioData);
    }

    findByEmail(email: string): Promise<Usuario | null> {
        return Promise.resolve(usuarioData.find((usuario) => usuario.email === email) ?? null)
    }
    
    findByUsername(username: string): Promise<Usuario | null> {
        return Promise.resolve(usuarioData.find((usuario) => usuario.username === username) ?? null)
    }
    
}

export default UsuarioDataSourceImplLocal;

let usuarioData: Usuario[] = [
    {
        id: "1",
        username: "usuario1",
        email: "usuario1@gmail.com",
        password: "password1",
        role: "USER",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "2",
        username: "usuario2",
        email: "usuario2@gmail.com",
        password: "password2",
        role: "USER",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "3",
        username: "usuario3",
        email: "usuario3@gmail.com",
        password: "password3",
        role: "USER",
        createdAt: new Date(),
        updatedAt: new Date()
    }
];