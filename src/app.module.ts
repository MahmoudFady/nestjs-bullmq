import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appEnv } from './configuration/app-env.config';
import { BullmqModule } from './modules/bullmq/bullmq.module';

@Module({
  imports: [ConfigModule.forRoot({ load: [appEnv] }), BullmqModule],
  controllers: [AppController],
  providers: [AppService, ConfigService],
  exports: [ConfigService],
})
export class AppModule {}
