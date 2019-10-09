// API/src/Modules/Clients/ClientResolver.ts
import {
  Resolver,
  Mutation,
  Arg,
  ID,
  Ctx,
  Authorized,
  Query,
  ForbiddenError,
  Subscription,
  Root,
} from 'type-graphql';
import { Client } from './ClientModel';
import { Service } from '../Services/ServiceModel';
import { CreateClientInput } from './CreateClientInput';
import { AuthContext } from 'API/Context';
import { ClientEvent, ClientEventType } from './ClientEventOutput';
import { clientPubSub } from './ClientPubSub';

@Resolver(() => Client)
export class ClientResolver {
  @Authorized()
  @Query(() => Client)
  async client(
    @Arg('clientId', () => ID) clientId: string,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<Client> {
    const client = await Client.createQueryBuilder('client')
      .leftJoinAndSelect('client.service', 'service')
      .where('client.id = :clientId', { clientId })
      .andWhere('service.userId = :userId', { userId: currentUser.id })
      .getOne();

    if (!client) throw new ForbiddenError();
    return client;
  }

  @Authorized()
  @Mutation(() => Service)
  async createClient(
    @Arg('serviceId', () => ID) serviceId: string,
    @Arg('input') input: CreateClientInput,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<Service> {
    const service = await Service.findOneOrFail({
      where: { id: serviceId, userId: currentUser.id },
    });

    const client = Client.create({ serviceId: service.id, ...input });

    await client.save();

    return service;
  }

  @Authorized()
  @Mutation(() => Boolean)
  async emitClientEvent(
    @Arg('clientId', () => ID) clientId: string,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<boolean> {
    const client = await Client.createQueryBuilder('client')
      .leftJoinAndSelect('client.service', 'service')
      .where('client.id = :clientId', { clientId })
      .andWhere('service.userId = :userId', { userId: currentUser.id })
      .getOne();

    if (!client) throw new ForbiddenError();
    clientPubSub.publishClientEvent(client, { type: ClientEventType.BACKUP });

    return true;
  }

  @Subscription({
    // @ts-ignore
    subscribe: async (stuff, args) => clientPubSub.subscribe(args.clientToken),
  })
  clientEvents(
    @Arg('clientToken') clientToken: string,
    @Root() root: ClientEvent,
  ): ClientEvent {
    return root;
  }
}
