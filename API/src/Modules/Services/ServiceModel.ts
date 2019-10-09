// API/src/Modules/Services/ServiceModel.ts
import { ObjectType, Field, ID } from 'type-graphql';
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
