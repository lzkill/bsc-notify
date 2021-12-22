import { Module } from '@nestjs/common';
import { BrokerModule } from 'src/shared/broker/broker.module';
import { NotifyService } from './notify.service';
import { RateLimitedTelegramService } from './rate-limited/telegram.service';
import { TelegramService } from './rate-limited/telegram.service';

@Module({
  imports: [BrokerModule],
  providers: [NotifyService, RateLimitedTelegramService],
})
export class NotifyModule {}
