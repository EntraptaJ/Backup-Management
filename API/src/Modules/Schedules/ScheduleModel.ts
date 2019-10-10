// API/src/Modules/Schedules/ScheduleModel.ts
import { Client } from 'API/Modules/Clients/ClientModel';
import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CronJob } from 'cron';
import { format, utcToZonedTime } from 'date-fns-tz';
import { clientPubSub } from '../Clients/ClientPubSub';
import { ClientEventType } from '../Clients/ClientEventOutput';

@ObjectType()
@Entity()
export class Schedule extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field(() => Date)
  @CreateDateColumn()
  readonly createdAt: Date;

  @Field()
  @UpdateDateColumn()
  readonly updatedAt: Date;

  @ManyToOne(() => Client)
  @JoinColumn()
  readonly client: Client;
  @Column({ nullable: true })
  readonly clientId: string;

  @Field()
  @Column({ type: 'time' })
  time: string;
}

const TIME_ZONE = 'America/Winnipeg';

new CronJob(
  '*/15 * * * *',
  async () => {
    const newDate = new Date();
    const zoned = utcToZonedTime(newDate, TIME_ZONE);
    const Now = format(zoned, 'HH:mm');

    const schedules = await Schedule.find({
      where: { time: Now },
      relations: ['client'],
    });

    for (const schedule of schedules) {
      await clientPubSub.publishClientEvent(schedule.client, {
        type: ClientEventType.BACKUP,
      });
    }
  },
  undefined,
  true,
  TIME_ZONE,
);
