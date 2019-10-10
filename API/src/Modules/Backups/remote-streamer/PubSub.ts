// server/src/PubSub.ts
import { iterator } from 'p-event';
import { EventEmitter } from 'events';

interface StreamerPubSubOptions<T> {
  stream: EventEmitter;
  dataEvent: string;
  endEvent: string;
}

export class StreamerPubSub<T> {
  public stream: EventEmitter;
  public dataEvent: string;
  public endEvent: string;

  constructor({ stream, dataEvent, endEvent }: StreamerPubSubOptions<T>) {
    this.stream = stream;
    this.dataEvent = dataEvent;
    this.endEvent = endEvent;
  }

  public async subscribe(): Promise<AsyncIterableIterator<T>> {
    const stream = this.stream;

    return iterator(stream, this.dataEvent, {
      resolutionEvents: [this.endEvent]
    });
  }
}
