import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT);
  const PORT = process.env.PORT || 3001;
  console.log(`Listing in ${process.env.URL_BACKEBD}:${PORT}`);
}
bootstrap();
