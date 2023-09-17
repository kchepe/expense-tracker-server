import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

// const httpsOptions = {
//   key: fs.readFileSync('./secrets/private.key'),
//   cert: fs.readFileSync('./secrets/certificate.crt'),
// };

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // app.enableCors({
  //   allowedHeaders: ['content-type'],
  //   origin: 'http://localhost:3001',
  //   credentials: true,
  // });
  await app.listen(3000);
}
bootstrap();
