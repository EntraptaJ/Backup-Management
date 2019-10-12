// API/src/Modules/Backups/BackupResolver.ts
import { AuthContext } from 'API/Context';
import intoStream from 'into-stream';
import {
  Arg,
  Ctx,
  FieldResolver,
  ForbiddenError,
  ID,
  Mutation,
  Resolver,
  Root,
  Subscription,
} from 'type-graphql';
import { Client } from '../Clients/ClientModel';
import { Backup, BackupState } from './BackupModel';
import { createWritableServerStream } from './remote-streamer';
import { BackupFile } from './BackupFileModel';

interface BackupStream {
  id: string;
  buffer?: Buffer;
}

let backupStreams: BackupStream[] = [];

@Resolver(() => Backup)
export class BackupResolver {
  @Mutation(() => Backup)
  async createBackup(@Arg('clientToken') clientToken: string): Promise<Backup> {
    const client = await Client.getClientFromToken(clientToken);

    const backupFile = await BackupFile.create().save();

    const backup = Backup.create({
      state: BackupState.STREAMING,
      clientId: client.id,
      backupFileId: backupFile.id,
    });
    await backup.save();

    const backupStream: BackupStream = { id: backup.id };
    backupStreams.push(backupStream);

    return backup;
  }

  @Mutation(() => Boolean)
  async pushBackupChunk(
    @Arg('backupId', () => ID) backupId: string,
    @Arg('chunk') chunk: string,
  ): Promise<boolean> {
    const backupStream = backupStreams.find(({ id }) => id === backupId);
    if (!backupStream) throw new ForbiddenError();

    if (backupStream.buffer)
      backupStream.buffer = Buffer.concat([
        backupStream.buffer,
        Buffer.from(chunk, 'base64'),
      ]);
    else backupStream.buffer = Buffer.from(chunk, 'base64');

    return true;
  }

  @Mutation(() => Backup)
  async finishBackup(
    @Arg('backupId', () => ID) backupId: string,
  ): Promise<Backup> {
    const backupStream = backupStreams.find(({ id }) => id === backupId);
    if (!backupStream || !backupStream.buffer) throw new ForbiddenError();

    const backup = await Backup.findOneOrFail({
      where: { id: backupId },
      relations: ['backupFile'],
    });

    backup.backupFile.archiveFile = backupStream.buffer;
    await backup.backupFile.save();

    backup.state = BackupState.FINISHED;
    backup.fileSize = backupStream.buffer.length;
    await backup.save();

    return backup;
  }

  @Mutation(() => Client)
  async deleteBackup(
    @Arg('backupId', () => ID) backupId: string,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<Client> {
    const backup = await Backup.createQueryBuilder('backup')
      .leftJoinAndSelect('backup.client', 'client')
      .leftJoinAndSelect('client.service', 'service')
      .where('backup.id = :backupId', { backupId })
      .andWhere('service.userId = :userId', { userId: currentUser.id })
      .getOne();

    if (!backup) throw new ForbiddenError();

    await backup.remove();

    return backup.client;
  }

  @Subscription({
    // @ts-ignore
    subscribe: async (stuff, { clientToken }) => {
      const client = await Client.getClientFromToken(clientToken);

      const backup = await Backup.findOneOrFail({
        where: { clientId: client.id },
        order: { updatedAt: 'DESC' },
        relations: ['backupFile'],
      });

      const readStream = intoStream(backup.backupFile.archiveFile);

      const { iterable, writeStream } = await createWritableServerStream();
      readStream.pipe(
        writeStream,
        { end: true },
      );

      return iterable;
    },
  })
  getLatestBackup(
    @Arg('clientToken') clientToken: string,
    @Root() root: Buffer,
  ): string {
    return root.toString('base64');
  }

  @FieldResolver(() => Client)
  async client(@Root() { clientId }: Backup): Promise<Client> {
    return Client.findOneOrFail(clientId);
  }
}
