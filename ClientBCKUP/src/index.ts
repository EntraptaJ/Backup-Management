// ClientBCKUP/src/index.ts
import { initApollo } from './initApollo';
import { subscribeToClientEvents } from './events';

const URL = process.env.API_URL || 'http://localhost/graphql';

export const clientToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6ImJlMzg2ZTYyLWZlZGQtNDUzZS04NTVlLWRlNzQwOTcyOTYzYiIsImlhdCI6MTU3MDYzNzY1M30.EhTwjYb5k1jyCYw0e-sH7P3RYhyzM_RyG9adW6tLzqg`;

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
