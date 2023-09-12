import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

const httpsOptions = {
  key: fs.readFileSync('./secrets/cert.key'),
  cert: fs.readFileSync('./secrets/cert.crt'),
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.enableCors();
  // app.enableCors({
  //   allowedHeaders: ['content-type'],
  //   origin: 'http://localhost:3001',
  //   credentials: true,
  // });
  await app.listen(3000);
}
bootstrap();
