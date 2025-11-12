import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsuarioModule } from './features/usuario/usuario.module';
import { PublicacionModule } from './features/publicacion/publicacion.module';
@Module({
  imports: [
    UsuarioModule,
    PublicacionModule,

    MongooseModule.forRoot('mongodb://localhost:27017/red-utn'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
