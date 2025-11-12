import { Module } from '@nestjs/common';
import UsuarioRepositorieImpl from './infraestructure/repositories/usuario.repositorie.impl';
import UsuarioDataSourceImplLocal from './infraestructure/datasources/usuario.datasource.impl.local';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';

@Module({
    controllers: [UsuarioController],
    providers: [
        UsuarioService,
        {
            provide: UsuarioRepositorieImpl,
            useClass: UsuarioDataSourceImplLocal
        }
    ],
    exports: [UsuarioService] // Exportar el servicio para usarlo en otros módulos
})
export class UsuarioModule {}