import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  AppConfig,
  PapertrailConfig,
  RabbitMqConfig,
  TelegramConfig,
} from './config-schemas';

@Injectable()
export class AppConfigService {
  app: AppConfig;
  papertrail: PapertrailConfig;
  rabbitmq: RabbitMqConfig;
  telegram: TelegramConfig;

  constructor(private config: ConfigService) {
    this.app = config.get<AppConfig>('app');
    this.papertrail = config.get<PapertrailConfig>('papertrail');
    this.rabbitmq = config.get<RabbitMqConfig>('rabbitmq');
    this.telegram = config.get<TelegramConfig>('telegram');
  }
}
