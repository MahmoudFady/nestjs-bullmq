import { BullModule } from '@nestjs/bullmq';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullQueueNames } from './types/bull-queue.enum';
import { BullmqProducerService } from './bullmq-producer.service';
@Global()
@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get('redis.host'),
          port: configService.get('redis.port'),
        },
      }),
    }),
    BullModule.registerQueue(
      { name: BullQueueNames.SMS },
      { name: BullQueueNames.EMAIL },
      { name: BullQueueNames.NOTIFICATION },
    ),
  ],
  providers: [BullmqProducerService],
  exports: [BullmqProducerService],
})
export class BullmqModule {}
