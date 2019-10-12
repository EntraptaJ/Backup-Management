// API/src/Modules/Backups/BackupModel.ts
import { EventEmitter } from 'events';
import { remove } from 'fs-extra';
import { Field, ID, Int, ObjectType, registerEnumType } from 'type-graphql';
import {
  AfterInsert,
  BaseEntity,
  BeforeRemove,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Client } from '../Clients/ClientModel';

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

  @AfterInsert()
  afterInsert(): void {
    backupEvents.emit(this.clientId);
  }

  @BeforeRemove()
  async deleteBackup(): Promise<boolean> {
    console.log(`Deleting archive for ${this.id}`);

    remove(`${DATA_PATH}/${this.clientId}/${this.id}.tar`).catch(() => {
      console.info(`Failed to delete archive for ${this.id}`);
    });

    return true;
  }
}
