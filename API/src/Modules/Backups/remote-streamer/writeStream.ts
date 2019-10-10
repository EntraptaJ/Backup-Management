// server/src/writeStream.ts
import { Writable } from 'stream';
import { StreamerPubSub } from './PubSub';
import { EventEmitter } from 'events';

interface CreateWriteStreamResponse<T> {
  writeStream: Writable;
  iterable: Promise<AsyncIterableIterator<T>>;
}

export async function createWritableServerStream<T>(): Promise<
  CreateWriteStreamResponse<T>
> {
  const emitter = new EventEmitter();
  const writeStream = new Writable({
    write(chunk, encoding, callback) {
      emitter.emit('data', chunk);
      callback();
    },
    final() {
      emitter.emit('finish');
    },
  });

  const pubSub = new StreamerPubSub<T>({
    stream: emitter,
    dataEvent: 'data',
    endEvent: 'finish',
  });

  return { writeStream, iterable: pubSub.subscribe() };
}
