// API/src/Modules/Backups/BackupResolver.ts
import {
  Resolver,
  Mutation,
  Arg,
  ID,
  ForbiddenError,
  FieldResolver,
  Root,
  Subscription,
} from 'type-graphql';
import { Backup, BackupState } from './BackupModel';
import { WriteStream, createWriteStream, createReadStream } from 'fs-extra';
import { createWritableServerStream } from './remote-streamer';
import { Client } from '../Clients/ClientModel';

const DATA_PATH =
  process.env.NODE_ENV === 'production'
    ? process.env.DATA_PATH || '/data'
    : 'data';

interface BackupStream {
  id: string;
  writeStream: WriteStream;
}

let backupStreams: BackupStream[] = [];

@Resolver(() => Backup)
export class BackupResolver {
  @Mutation(() => Backup)
  async createBackup(@Arg('clientToken') clientToken: string): Promise<Backup> {
    const client = await Client.getClientFromToken(clientToken);

    const backup = Backup.create({
      state: BackupState.STREAMING,
      clientId: client.id,
    });
    await backup.save();

    const writeStream = createWriteStream(`${DATA_PATH}/${backup.id}.tar`);
    const backupStream: BackupStream = { id: backup.id, writeStream };

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

    backupStream.writeStream.write(Buffer.from(chunk, 'base64'));

    return true;
  }

  @Mutation(() => Backup)
  async finishBackup(
    @Arg('backupId', () => ID) backupId: string,
  ): Promise<Backup> {
    const backup = await Backup.findOneOrFail({ where: { id: backupId } });

    backup.state = BackupState.FINISHED;
    await backup.save();

    backupStreams = backupStreams.filter(({ id }) => id !== backupId);

    return backup;
  }

  @FieldResolver(() => Client)
  async client(@Root() { clientId }: Backup): Promise<Client> {
    return Client.findOneOrFail(clientId);
  }

  @Subscription({
    // @ts-ignore
    subscribe: async (stuff, { clientToken }) => {
      const client = await Client.getClientFromToken(clientToken);
      const backup = await Backup.findOneOrFail({
        where: { clientId: client.id },
        order: { updatedAt: 'DESC' },
      });

      const { iterable, writeStream } = await createWritableServerStream();
      const streamer = createReadStream(`${DATA_PATH}/${backup.id}.tar`);

      streamer.pipe(
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
}
