// ClientBCKUP/src/index.ts
import { initApollo } from './initApollo';
import { subscribeToClientEvents } from './Events';

const URL = process.env.API_URL || 'http://localhost/graphql';

export const clientToken = process.env.CLIENT_TOKEN;

async function startClientBCKUP(): Promise<void> {
  const client = initApollo({ URL });

  await subscribeToClientEvents(client, clientToken);

  /* 

  const stream = await createStream(client, clientToken);


  const readStream = getPathStream(
    'node_modules',
    '4m!3R6EPDvEYKAT*BcRouUv@pXc66vj2c6IvljXVbEVAAIXKvMzKZ3bu'
  );
  const serverWritableStream = createServerWriteStream(
    client,
    clientToken,
    stream.id
  );

  readStream.pipe(serverWritableStream); */
}

startClientBCKUP();
