// ClientBCKUP/src/Backups/index.ts
import { ApolloClient } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { Backup } from '../graphqlTypes.gen';
import { createBackup, createBackupStream } from './createBackup';
import { getPathStream } from '../getFiles';
import pEvent from 'p-event';

export async function startBackup(
  client: ApolloClient<NormalizedCacheObject>,
  clientToken: string
): Promise<Backup> {
  const backup = await createBackup(client, clientToken);

  const writeStream = await createBackupStream(client, backup.id);

  const readStream = await getPathStream(backup.client.path, '544845');

  readStream.pipe(writeStream);

  return pEvent(writeStream, 'done');
}
