// API/src/Modules/Backups/BackupModel.ts
import { config } from 'API/Config';
import { ApolloError } from 'apollo-server-koa';
import { sign, verify } from 'jsonwebtoken';
import { Field, ID, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  BeforeRemove,
  Column,
  CreateDateColumn,
  Entity,
  FindOneOptions,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  SelectQueryBuilder,
} from 'typeorm';
import { Backup } from '../Backups/BackupModel';
import { Schedule } from '../Schedules/ScheduleModel';
import { Service } from '../Services/ServiceModel';

interface ClientTokenPayload {
  clientId: string;
}

@ObjectType()
@Entity()
export class Client extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @Field(() => Service)
  @ManyToOne(() => Service)
  @JoinColumn()
  readonly service: Service;
  @Column()
  readonly serviceId: string;

  @Field(() => [Schedule])
  @OneToMany(() => Schedule, (schedule) => schedule.client, {
    cascade: ['insert'],
  })
  schedules: Schedule[];

  clientToken(): string {
    const payload: ClientTokenPayload = { clientId: this.id };
    return sign(payload, config.secretKey);
  }

  @Field()
  @Column('text')
  path: string;

  @Field()
  @Column('int', { default: 3 })
  keepBackupsCount: number;

  @Field(() => Int)
  async backupCount(): Promise<number> {
    return Backup.count({ where: { clientId: this.id } });
  }

  @Field(() => [Backup])
  async backups(): Promise<Backup[]> {
    return Backup.find({ clientId: this.id });
  }

  @Field(() => Int)
  async folderSize(): Promise<number> {
    const { sum } = await Backup.createQueryBuilder('backups')
      .select('SUM(backups.fileSize)', 'sum')
      .where('backups.clientId = :clientId', { clientId: this.id })
      .getRawOne();
    if (!sum) {
      return 0;
    }
    return sum;
  }

  static async getClientFromToken(
    clientToken: string,
    options?: FindOneOptions<Client>,
  ): Promise<Client> {
    const payload = verify(clientToken, config.secretKey) as ClientTokenPayload;
    if (!payload.clientId)
      throw new ApolloError('Invalid Client token', 'INVALID_CLIENT_TOKEN');

    const client = await this.findOne(payload.clientId, options);
    if (!client)
      throw new ApolloError('INVALID Subscription', 'INVALID_SUBSCRIPTION');

    return client;
  }

  /**
   * Purges backups further then the set keep backups amount
   */
  async purgeBackups(): Promise<any> {
    const backups = await Backup.find({
      where: { clientId: this.id },
      order: { createdAt: 'DESC' },
      skip: this.keepBackupsCount,
    });

    await Backup.remove(backups);
  }

  static getUserClientQuery(
    clientId: string,
    userId: string,
  ): SelectQueryBuilder<Client> {
    return Client.createQueryBuilder('client')
      .leftJoinAndSelect('client.service', 'service')
      .where('client.id = :clientId', { clientId })
      .andWhere('service.userId = :userId', { userId });
  }

  static async getUserClient(
    clientId: string,
    userId: string,
  ): Promise<Client | undefined> {
    return this.getUserClientQuery(clientId, userId).getOne();
  }

  @BeforeRemove()
  async beforeRemove(): Promise<void> {
    console.log(`Removing ${this.id}`);

    const [schedules, backups] = await Promise.all([
      Schedule.find({ clientId: this.id }),
      Backup.find({ clientId: this.id }),
    ]);
    await Promise.all([Schedule.remove(schedules), Backup.remove(backups)]);
  }
}
