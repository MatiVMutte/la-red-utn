import { Module } from '@nestjs/common';
import UsuarioRepositorieImpl from './infraestructure/repositories/usuario.repositorie.impl';
import UsuarioDataSourceImplLocal from './infraestructure/datasources/usuario.datasource.impl.local';
import { UsuarioController } from './infraestructure/controller/usuario.controller';

@Module({
    controllers: [UsuarioController],
    providers: [{
        provide: UsuarioRepositorieImpl,
        useClass: UsuarioDataSourceImplLocal
    }],

})
export class UsuarioModule {}