import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config/config-helper';
import { AppConfigModule } from './config/config.module';
import { NotifyModule } from './notify/notify.module';
import { AppLoggerModule } from './shared/logger/logger.module';

@Module({
  imports: [
    AppConfigModule,
    AppLoggerModule,
    NotifyModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [() => config.createConfig()],
    }),
  ],
})
export class AppModule {}
