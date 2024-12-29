import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { appEnv } from './configuration/app-env.config';

@Module({
  imports: [ConfigModule.forRoot({ load: [appEnv] })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
