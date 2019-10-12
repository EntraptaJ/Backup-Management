// API/src/Modules/Backups/BackupModel.ts
import { EventEmitter } from 'events';
import { Field, ID, Int, ObjectType, registerEnumType } from 'type-graphql';
import {
  AfterInsert,
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Client } from '../Clients/ClientModel';
import { BackupFile } from './BackupFileModel';

export const DATA_PATH =
  process.env.NODE_ENV === 'production'
    ? process.env.DATA_PATH || '/data'
    : 'data';

export enum BackupState {
  STREAMING = 'STREAMING',
  FINISHED = 'FINISHED',
}

registerEnumType(BackupState, { name: 'BackupState' });

export const backupEvents = new EventEmitter();

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

  @Field(() => Int)
  @Column('int', { default: 0 })
  fileSize: number;

  @OneToOne(() => BackupFile)
  @JoinColumn()
  backupFile: BackupFile;
  @Column()
  backupFileId: string;

  @AfterInsert()
  afterInsert(): void {
    backupEvents.emit(this.clientId);
  }
}
