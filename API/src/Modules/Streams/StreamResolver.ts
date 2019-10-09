// API/src/Modules/Streams/StreamResolver.ts
/*
import {
  Resolver,
  Mutation,
  Arg,
  ID,
  Ctx,
  ArgumentValidationError,
} from 'type-graphql';
import { Stream } from './StreamModel';
import { Service } from '../Services/ServiceModel';
import { AuthContext } from 'API/Context';
import { WriteStream, createWriteStream } from 'fs-extra';

const DATA_PATH =
  process.env.NODE_ENV === 'production'
    ? process.env.DATA_PATH || '/data'
    : 'data';

interface StreamState {
  id: string;
  writeStream: WriteStream;
}

let states: StreamState[] = [];
/*
@Resolver(() => Stream)
export class StreamResolver {
  @Mutation(() => Stream)
  async createStream(
    @Arg('clientToken') clientToken: string,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<Stream> {
    const service = await Service.getServiceFromToken(clientToken);

    const stream = Stream.create({ serviceId: service.id });
    await stream.save();

    const writeStream = createWriteStream(`${DATA_PATH}/${service.id}.tar`);

    const streamState: StreamState = { id: stream.id, writeStream };

    states.push(streamState);

    return stream;
  }

  @Mutation(() => Boolean)
  async deleteStream(
    @Arg('streamId', () => ID) streamId: string,
    @Arg('clientToken') clientToken: string,
  ): Promise<boolean> {
    try {
      const stream = await Stream.findOneOrFail(streamId);

      const streamState = states.find(({ id }) => id === stream.id);
      if (!streamState)
        throw new ArgumentValidationError([
          {
            property: 'streamId',
            constraints: {
              isValid: 'Stream not found',
            },
            children: [],
          },
        ]);

      streamState.writeStream.end();

      states = states.filter(({ id }) => id === stream.id);

      await stream.remove();

      return true;
    } catch {
      return false;
    }
  }

  @Mutation(() => Boolean)
  async pushStream(
    @Arg('streamId', () => ID) streamId: string,
    @Arg('clientToken') clientToken: string,
    @Arg('chunk') chunk: string,
  ): Promise<boolean> {
    const streamState = states.find(({ id }) => id === streamId);
    if (!streamState)
      throw new ArgumentValidationError([
        {
          property: 'streamId',
          constraints: {
            isValid: 'Stream not found',
          },
          children: [],
        },
      ]);

    const chunkBuffer = Buffer.from(chunk, 'base64');
    streamState.writeStream.write(chunkBuffer);

    return true;
  }
}
*/
