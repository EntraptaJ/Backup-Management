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

const FifteenIntervals = ['00', '15', '30', '45'];

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
  @Query(() => String)
  async getClientToken(
    @Arg('clientId', () => ID) clientId: string,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<string> {
    const client = await Client.createQueryBuilder('client')
      .leftJoinAndSelect('client.service', 'service')
      .where('client.id = :clientId', { clientId })
      .andWhere('service.userId = :userId', { userId: currentUser.id })
      .getOne();

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
    const client = await Client.createQueryBuilder('client')
      .leftJoinAndSelect('client.service', 'service')
      .leftJoinAndSelect('client.schedules', 'schedules')
      .where('client.id = :clientId', { clientId })
      .andWhere('service.userId = :userId', { userId: currentUser.id })
      .getOne();

    if (!client) throw new ForbiddenError();

    console.log(input.time.split(':')[1]);
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

  @FieldResolver(() => Client)
  async schedules(@Root() client: Client) {
    const Schedules = await Schedule.find({
      cache: 1000,
      where: { clientId: client.id },
    });
    return Schedules;
  }
}
