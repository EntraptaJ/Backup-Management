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
  FieldResolver,
  ArgumentValidationError,
} from 'type-graphql';
import { Client } from './ClientModel';
import { Service } from '../Services/ServiceModel';
import { CreateClientInput } from './CreateClientInput';
import { AuthContext } from 'API/Context';
import { ClientEvent, ClientEventType } from './ClientEventOutput';
import { clientPubSub } from './ClientPubSub';
import { Schedule } from '../Schedules/ScheduleModel';
import { CreateScheduleInput } from './CreateScheduleInput';
import pEvent from 'p-event';
import { backupEvents, DATA_PATH } from '../Backups/BackupModel';
import { ClientInput } from './ClientInput';
import { mkdir } from 'fs-extra';

const FifteenIntervals = ['00', '15', '30', '45'];

@Resolver(() => Client)
export class ClientResolver {
  @Authorized()
  @Query(() => Client)
  async client(
    @Arg('clientId', () => ID) clientId: string,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<Client> {
    const client = await Client.getUserClient(clientId, currentUser.id);
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

    mkdir(`${DATA_PATH}/${client.id}`);

    return Service.findOneOrFail({ id: client.serviceId });
  }

  @Authorized()
  @Mutation(() => Service)
  async updateClient(
    @Arg('clientId', () => ID) clientId: string,
    @Ctx() { currentUser }: AuthContext,
    @Arg('update') update: ClientInput,
  ): Promise<Service> {
    const client = await Client.getUserClient(clientId, currentUser.id);
    if (!client) throw new ForbiddenError();

    return client.service;
  }

  @Authorized()
  @Mutation(() => Service)
  async deleteClient(
    @Arg('clientId', () => ID) clientId: string,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<Service> {
    const client = await Client.getUserClient(clientId, currentUser.id);
    if (!client) throw new ForbiddenError();

    await client.remove();

    return client.service;
  }

  @Authorized()
  @Query(() => String)
  async getClientToken(
    @Arg('clientId', () => ID) clientId: string,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<string> {
    const client = await Client.getUserClient(clientId, currentUser.id);
    if (!client) throw new ForbiddenError();

    return client.clientToken();
  }

  @Authorized()
  @Mutation(() => Client)
  async createSchedule(
    @Arg('clientId', () => ID) clientId: string,
    @Arg('input', () => CreateScheduleInput) input: CreateScheduleInput,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<Client> {
    const client = await Client.getUserClientQuery(clientId, currentUser.id)
      .leftJoinAndSelect('client.schedules', 'schedules')
      .getOne();
    if (!client) throw new ForbiddenError();

    if (!FifteenIntervals.includes(input.time.split(':')[1]))
      throw new ArgumentValidationError([
        {
          property: 'time',
          constraints: {
            isValid: 'Not a 15 minute time',
          },
          children: [],
        },
      ]);

    const newSchedule = Schedule.create(input);
    client.schedules.push(newSchedule);

    return client.save();
  }

  @Authorized()
  @Mutation(() => Client)
  async emitClientEvent(
    @Arg('clientId', () => ID) clientId: string,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<Client> {
    const client = await Client.getUserClient(clientId, currentUser.id);
    if (!client) throw new ForbiddenError();

    clientPubSub.publishClientEvent(client, { type: ClientEventType.BACKUP });

    await pEvent(backupEvents, clientId);
    await client.reload();
    return client;
  }

  @Authorized()
  @Mutation(() => Client)
  async purgeBackups(
    @Arg('clientId', () => ID) clientId: string,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<Client> {
    const client = await Client.getUserClient(clientId, currentUser.id);
    if (!client) throw new ForbiddenError();

    await client.purgeBackups();

    return client;
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

  @FieldResolver(() => Client)
  async schedules(@Root() client: Client) {
    const Schedules = await Schedule.find({
      where: { clientId: client.id },
    });

    return Schedules;
  }

  @FieldResolver()
  async service(@Root() { serviceId }: Client): Promise<Service> {
    return Service.findOneOrFail(serviceId);
  }
}
