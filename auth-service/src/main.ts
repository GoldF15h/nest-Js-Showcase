import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  if (!process.env.PORT) {
    console.log('ENV ERROR');
    return;
  }
  console.log(`app listening on port ${process.env.PORT}`);
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT);
}
bootstrap();
