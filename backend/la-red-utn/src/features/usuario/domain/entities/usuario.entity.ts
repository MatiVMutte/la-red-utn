class Usuario {
    id: string;
    nombre: string;
    apellido: string;
    username: string;
    email: string;
    password: string;
    fechaNacimiento: Date;
    descripcion: string;
    profileImageUrl?: string;
    role: string; // 'usuario' o 'administrador'
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null; // Soft delete
}

export default Usuario;
