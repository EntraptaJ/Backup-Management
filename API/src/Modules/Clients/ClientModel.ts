// API/src/Modules/Backups/BackupModel.ts
import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  FindOneOptions,
  OneToMany,
} from 'typeorm';
import { Service } from '../Services/ServiceModel';
import { sign, verify } from 'jsonwebtoken';
import { config } from 'API/Config';
import { ApolloError } from 'apollo-server-koa';
import { Backup } from '../Backups/BackupModel';
import { Schedule } from '../Schedules/ScheduleModel';

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

  @Field(() => [Backup])
  async backups(): Promise<Backup[]> {
    return Backup.find({ clientId: this.id });
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
}
