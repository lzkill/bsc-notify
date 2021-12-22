import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import {
  RABBITMQ_BISCOINT_EXCHANGE,
  RABBITMQ_BISCOINT_NOTIFY_KEY,
} from 'src/app-constants';
import { AppConfigService } from 'src/config/config.service';
import { AppLoggerService } from 'src/shared/logger/logger.service';
import {
  formatTradeClosedMessage,
  formatTradeOpenMessage,
} from './telegram-messages';
import { TelegramService } from './rate-limited/telegram.service';
import { Trade, TradeEvent } from './trade-interfaces';

export interface NotifyJob {
  event: TradeEvent;
  trade: Trade;
}

@Injectable()
export class NotifyService {
  constructor(
    private config: AppConfigService,
    private logger: AppLoggerService,
    private telegram: TelegramService,
  ) {}

  @RabbitSubscribe({
    exchange: RABBITMQ_BISCOINT_EXCHANGE,
    routingKey: RABBITMQ_BISCOINT_NOTIFY_KEY,
    queueOptions: {
      autoDelete: true,
    },
  })
  async notify(job: NotifyJob) {
    this.notifyOnTelegram(job);
  }

  private notifyOnTelegram(job: NotifyJob) {
    try {
      if (this.config.app.enabled) {
        let message;
        switch (job.event) {
          case TradeEvent.TRADE_OPEN:
            message = formatTradeOpenMessage(job.event, job.trade);
            break;
          case TradeEvent.TRADE_BROKEN:
            message = formatTradeOpenMessage(job.event, job.trade);
            break;
          case TradeEvent.TRADE_CLOSED:
            message = formatTradeClosedMessage(job.trade);
            break;
        }

        if (message) this.telegram.sendMessage(message);
      }
    } catch (e) {
      this.logger.error(e);
    }
  }
}
