// API/src/Modules/Clients/ClientPubSub.ts
import { EventEmitter } from 'events';
import { iterator } from 'p-event';
import { Client } from './ClientModel';
import { ClientEvent } from './ClientEventOutput';

export class ClientPubSub {
  public eventEmitter = new EventEmitter();

  public async publishClientEvent(
    client: Client,
    event: ClientEvent,
  ): Promise<any> {
    this.eventEmitter.emit(client.id, event);
  }

  public async subscribe(
    clientToken: string,
  ): Promise<AsyncIterator<ClientEvent>> {
    const eventEmitter = this.eventEmitter;

    const client = await Client.getClientFromToken(clientToken);

    async function* subscribeToClientEvents() {
      yield* iterator(eventEmitter, client.id);
    }

    return subscribeToClientEvents();
  }
}

export const clientPubSub = new ClientPubSub();
