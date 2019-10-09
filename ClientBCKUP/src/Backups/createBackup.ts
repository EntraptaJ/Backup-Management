// ClientBCKUP/src/Backups/createBackup.ts
import { ApolloClient } from 'apollo-client';
import { Backup, Client } from '../graphqlTypes.gen';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import {
  CreateBackup,
  CreateBackupMutation,
  CreateBackupMutationVariables
} from './GraphQL/CreateBackup.gen';
import { Writable } from 'stream';
import {
  PushBackupChunk,
  PushBackupChunkMutation,
  PushBackupChunkMutationVariables
} from './GraphQL/PushBackupChunk.gen';
import {
  FinishBackup,
  FinishBackupMutation,
  FinishBackupMutationVariables
} from './GraphQL/FinishBackup.gen';

export async function createBackup(
  client: ApolloClient<NormalizedCacheObject>,
  clientToken: string
): Promise<
  Pick<Backup, 'id' | 'state'> & {
    client: { __typename?: 'Client' } & Pick<Client, 'path' | 'id'>;
  }
> {
  const { data } = await client.mutate<
    CreateBackupMutation,
    CreateBackupMutationVariables
  >({ mutation: CreateBackup, variables: { clientToken } });
  if (!data) throw new Error('INVALID RESPONSE');

  return data.createBackup;
}

export async function createBackupStream(
  client: ApolloClient<NormalizedCacheObject>,
  backupId: string
): Promise<Writable> {
  const writeStream = new Writable({
    async write(chunk: Buffer, encoding: string, next: () => void) {
      await client.mutate<
        PushBackupChunkMutation,
        PushBackupChunkMutationVariables
      >({
        mutation: PushBackupChunk,
        variables: {
          backupId: backupId,
          chunk: chunk.toString('base64')
        }
      });
      next();
    },
    async final() {
      const { data } = await client.mutate<
        FinishBackupMutation,
        FinishBackupMutationVariables
      >({ mutation: FinishBackup, variables: { backupId } });

      if (!data) return;

      writeStream.emit('done', data.finishBackup);
    }
  });

  return writeStream;
}
