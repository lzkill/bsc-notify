import * as joi from 'joi';

export const appSchema = joi.object({
  name: joi.string().required(),
  enabled: joi.boolean().default(true),
});

export const papertrailSchema = joi.object({
  token: joi.string().empty(''),
  enabled: joi.boolean().default(false),
});

export const rabbitMqSchema = joi.object({
  uri: joi.string().required(),
});

export const telegramSchema = joi.object({
  token: joi.string().empty(''),
  chatId: joi.string().empty(''),
  enabled: joi.boolean().default(false),
});

export interface AppConfig {
  name: string;
  enabled: boolean;
}

export interface PapertrailConfig {
  token: string;
  enabled: boolean;
}

export interface RabbitMqConfig {
  uri: string;
}

export interface TelegramConfig {
  token: string;
  chatId: string;
  enabled: boolean;
}
