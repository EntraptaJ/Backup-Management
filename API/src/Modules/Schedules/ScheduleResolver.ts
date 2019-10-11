// API/src/Modules/Schedules/ScheduleResolver.ts
import {
  Resolver,
  Mutation,
  Arg,
  ID,
  Ctx,
  ForbiddenError,
  Authorized,
} from 'type-graphql';
import { Schedule } from './ScheduleModel';
import { Client } from '../Clients/ClientModel';
import { ScheduleInput } from './ScheduleInput';
import { AuthContext } from 'API/Context';

@Resolver(() => Schedule)
export class ScheduleResolver {
  @Authorized()
  @Mutation(() => Client)
  async updateSchedule(
    @Arg('scheduleId', () => ID) scheduleId: string,
    @Arg('update') updated: ScheduleInput,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<Client> {
    let schedule = await Schedule.createQueryBuilder('schedule')
      .leftJoinAndSelect('schedule.client', 'client')
      .leftJoinAndSelect('client.service', 'service')
      .where('schedule.id = :scheduleId', { scheduleId })
      .andWhere('service.userId = :userId', { userId: currentUser.id })
      .getOne();

    if (!schedule) throw new ForbiddenError();

    for (const [key, value] of Object.entries(updated) as [
      keyof ScheduleInput,
      string,
    ][])
      schedule[key] = value;
    await schedule.save();

    return schedule.client;
  }

  @Authorized()
  @Mutation(() => Client)
  async deleteSchedule(
    @Arg('scheduleId', () => ID) scheduleId: string,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<Client> {
    let schedule = await Schedule.createQueryBuilder('schedule')
      .leftJoinAndSelect('schedule.client', 'client')
      .leftJoinAndSelect('client.service', 'service')
      .where('schedule.id = :scheduleId', { scheduleId })
      .andWhere('service.userId = :userId', { userId: currentUser.id })
      .getOne();

    if (!schedule) throw new ForbiddenError();

    await schedule.remove();

    return schedule.client;
  }
}
