import { Module } from '@nestjs/common';
import { UsuarioController } from './controller/usuario.controller';
import UsuarioRepositorieImpl from './infraestructure/repositories/usuario.repositorie.impl';
import UsuarioDataSourceImplLocal from './infraestructure/datasources/usuario.datasource.impl.local';

@Module({
    controllers: [UsuarioController],
    providers: [{
        provide: UsuarioRepositorieImpl,
        useClass: UsuarioDataSourceImplLocal
    }],

})
export class UsuarioModule {}