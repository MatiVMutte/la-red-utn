import UsuarioDataSource from "../../domain/datasources/usuario.datasource.mongodb";
import Usuario from "../../domain/entities/usuario.entity";

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

import { v4 as uuid } from 'uuid';

let usuarioData: Usuario[] = [
    {
        id: uuid(),
        nombre: "Juan",
        apellido: "Pérez",
        username: "usuario1",
        email: "usuario1@gmail.com",
        password: "password1",
        fechaNacimiento: new Date('1990-05-15'),
        descripcion: "Usuario de prueba número uno",
        profileImageUrl: "https://example.com/profiles/usuario1.jpg",
        role: "USER",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
    },
    {
        id: uuid(),
        nombre: "María",
        apellido: "González",
        username: "usuario2",
        email: "usuario2@gmail.com",
        password: "password2",
        fechaNacimiento: new Date('1992-08-20'),
        descripcion: "Usuario de prueba número dos",
        profileImageUrl: "https://example.com/profiles/usuario2.jpg",
        role: "USER",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
    },
    {
        id: uuid(),
        nombre: "Carlos",
        apellido: "Rodríguez",
        username: "usuario3",
        email: "usuario3@gmail.com",
        password: "password3",
        fechaNacimiento: new Date('1988-12-10'),
        descripcion: "Usuario de prueba número tres",
        profileImageUrl: "https://example.com/profiles/usuario3.jpg",
        role: "USER",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
    }
];