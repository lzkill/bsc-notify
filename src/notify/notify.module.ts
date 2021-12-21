import { Module } from '@nestjs/common';
import { BrokerModule } from 'src/shared/broker/broker.module';
import { NotifyService } from './notify.service';
import { TelegramService } from './telegram.service';

@Module({
  imports: [BrokerModule],
  providers: [NotifyService, TelegramService],
})
export class NotifyModule {}
