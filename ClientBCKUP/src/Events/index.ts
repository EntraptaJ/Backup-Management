// ClientBCKUP/src/Events/index.ts
import { ApolloClient } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import {
  ClientEvents,
  ClientEventsSubscription,
  ClientEventsSubscriptionVariables
} from './ClientEvents.gen';
import { ClientEventType } from '../graphqlTypes.gen';
import { startBackup } from '../Backups';

export async function subscribeToClientEvents(
  client: ApolloClient<NormalizedCacheObject>,
  clientToken: string
): Promise<any> {
  client
    .subscribe<ClientEventsSubscription, ClientEventsSubscriptionVariables>({
      query: ClientEvents,
      variables: { clientToken }
    })
    .subscribe({
      async next({ data }) {
        if (data) {
          switch (data.clientEvents!.type) {
            case ClientEventType.Backup:
              await startBackup(client, clientToken);
          }
        }
      }
    });
}
