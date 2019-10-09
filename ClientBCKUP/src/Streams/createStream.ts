// ClientBCKUP/src/Streams/createStream.ts
import {
  CreateStream,
  CreateStreamMutation,
  CreateStreamMutationVariables
} from '../GraphQL/CreateStream.gen';
import { Stream } from 'API/graphqlTypes.gen';
import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

export async function createStream(
  client: ApolloClient<NormalizedCacheObject>,
  clientToken: string
): Promise<Pick<Stream, 'id'>> {
  const { data } = await client.mutate<
    CreateStreamMutation,
    CreateStreamMutationVariables
  >({ mutation: CreateStream, variables: { clientToken } });

  return data!.createStream!;
}
