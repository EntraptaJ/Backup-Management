// API/src/Modules/Backups/BackupModel.ts
import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Client } from '../Clients/ClientModel';

export enum BackupState {
  STREAMING = 'STREAMING',
  FINISHED = 'FINISHED',
}

registerEnumType(BackupState, { name: 'BackupState' });

@ObjectType()
@Entity()
export class Backup extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @CreateDateColumn()
  readonly createdAt: Date;

  @Field()
  @UpdateDateColumn()
  readonly updatedAt: Date;

  @ManyToOne(() => Client)
  @JoinColumn()
  readonly client: Client;
  @Column()
  readonly clientId: string;

  @Field(() => BackupState)
  @Column({ type: 'enum', enum: BackupState })
  state: BackupState;
}
