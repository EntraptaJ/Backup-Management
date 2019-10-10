// ClientBCKUP/src/index.ts
import { initApollo } from './initApollo';
import { subscribeToClientEvents } from './Events';

const URL = process.env.API_URL || 'http://localhost/graphql';

export const clientToken = process.env.CLIENT_TOKEN;

async function startClientBCKUP(): Promise<void> {
  const client = initApollo({ URL });

  await subscribeToClientEvents(client, clientToken);
}

startClientBCKUP();
