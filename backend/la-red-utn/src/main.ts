import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api');

  // Habilitar validación global con DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades que no están en el DTO
      forbidNonWhitelisted: true, // Lanza error si hay propiedades extra
      transform: true, // Transforma los payloads a instancias de DTO
    })
  );
  
  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('La Red UTN API')
    .setDescription('API REST para el sistema La Red UTN - Documentación completa de endpoints')
    .setVersion('1.0')
    .addTag('usuario', 'Operaciones relacionadas con usuarios')
    .addTag('publicacion', 'Operaciones relacionadas con publicaciones')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'La Red UTN - API Docs',
    customfavIcon: 'https://nestjs.com/img/logo_text.svg',
    customCss: '.swagger-ui .topbar { display: none }',
  });
  
  await app.listen(process.env.PORT ?? 3000);
  
  console.log(`🚀 Aplicación corriendo en: http://localhost:${process.env.PORT ?? 3000}`);
  console.log(`📚 Documentación Swagger en: http://localhost:${process.env.PORT ?? 3000}/api/docs`);
}
bootstrap();
