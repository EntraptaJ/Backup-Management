// ClientBCKUP/src/Streams/writeStream.ts
import {
  PushStream,
  PushStreamMutation,
  PushStreamMutationVariables
} from '../GraphQL/PushStream.gen';
import { Writable } from 'stream';
import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

export function createServerWriteStream(
  client: ApolloClient<NormalizedCacheObject>,
  clientToken: string,
  streamId: string
): Writable {
  const writeStream = new Writable({
    async write(chunk: Buffer, encoding: string, next: () => void) {
      await client.mutate<PushStreamMutation, PushStreamMutationVariables>({
        mutation: PushStream,
        variables: {
          streamId,
          clientToken,
          chunk: chunk.toString('base64')
        }
      });
      next();
    }
  });

  return writeStream;
}
