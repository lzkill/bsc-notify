import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TelegramService } from './notify/rate-limited/telegram.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(0);

  const telegram = app.get(TelegramService);
  await telegram.init();
}

bootstrap();
