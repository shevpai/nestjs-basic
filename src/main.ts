import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

(async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('NestJS course by ulbi-tv')
    .setDescription('REST API Documentation')
    .setVersion('1.0.0')
    .addTag('Ulbi Nest JS')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/documentation', app, document);

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
})();
