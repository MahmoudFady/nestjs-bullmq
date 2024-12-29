import { InjectQueue } from '@nestjs/bullmq';
import { BullQueueNames } from './types/bull-queue.enum';
import { JobsOptions, Queue } from 'bullmq';
import { NotFoundException } from '@nestjs/common';

export class BullmqProducerService {
  constructor(
    @InjectQueue(BullQueueNames.SMS)
    private readonly smsQueue: Queue,
    @InjectQueue(BullQueueNames.EMAIL)
    private readonly emailQueue: Queue,
    @InjectQueue(BullQueueNames.NOTIFICATION)
    private readonly notificationQueue: Queue,
  ) {}

  async addJob(
    name: BullQueueNames,
    data: { [k: string]: any },
    opts?: JobsOptions,
  ) {
    const queue = this.getQueuByName(name);
    opts = { attempts: 2, delay: 1000 * 5, ...opts };
    await queue.add(name, data, opts);
  }

  private getQueuByName(name: BullQueueNames): Queue {
    let queue: Queue;
    switch (name) {
      case BullQueueNames.EMAIL:
        queue = this.emailQueue;
        break;
      case BullQueueNames.SMS:
        queue = this.smsQueue;
        break;
      case BullQueueNames.NOTIFICATION:
        queue = this.notificationQueue;
        break;
      default:
        throw new NotFoundException(`${name} no queue with mentioned the name`);
    }
    return queue;
  }
}
