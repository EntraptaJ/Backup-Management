// API/src/Modules/Services/ServiceModel.ts
import { ObjectType, Field, ID, Int } from 'type-graphql';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { User } from '../Users/UserModel';
import { verify } from 'jsonwebtoken';
import { config } from 'API/Config';
import { ApolloError } from 'apollo-server-koa';
import { Client } from '../Clients/ClientModel';
import { Backup } from '../Backups/BackupModel';

interface ClientTokenPayload {
  serviceId: string;
}

@ObjectType()
@Entity()
export class Service extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @Field()
  @Column('varchar')
  name: string;

  @ManyToOne(() => User)
  readonly user: User;
  @Column()
  readonly userId: string;

  @Field(() => Int)
  async totalSize(): Promise<number> {
    const { sum } = await Client.createQueryBuilder('client')
      .where('client.serviceId = :serviceId', { serviceId: this.id })
      .leftJoinAndSelect(Backup, 'backups', 'backups.clientId = client.id')
      .select('SUM(backups.fileSize)', 'sum')
      .getRawOne();
    if (!sum) {
      return 0;
    }
    return sum;
  }

  static async getServiceFromToken(clientToken: string): Promise<Service> {
    const payload = verify(clientToken, config.secretKey) as ClientTokenPayload;
    if (!payload.serviceId)
      throw new ApolloError('Invalid Client token', 'INVALID_CLIENT_TOKEN');

    const service = await this.findOne(payload.serviceId);
    if (!service)
      throw new ApolloError('INVALID Subscription', 'INVALID_SUBSCRIPTION');

    return service;
  }
}
