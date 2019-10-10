// API/src/Modules/Schedules/ScheduleResolver.ts
import { Resolver, Mutation, Arg, ID, Ctx, ForbiddenError } from 'type-graphql';
import { Schedule } from './ScheduleModel';
import { Client } from '../Clients/ClientModel';
import { ScheduleInput } from './ScheduleInput';
import { AuthContext } from 'API/Context';

@Resolver(() => Schedule)
export class ScheduleResolver {
  @Mutation(() => Client)
  async updateSchedule(
    @Arg('scheduleId', () => ID) scheduleId: string,
    @Ctx() { currentUser }: AuthContext,
    @Arg('update', { nullable: true }) updated?: ScheduleInput,
  ): Promise<Client> {
    let schedule = await Schedule.createQueryBuilder('schedule')
      .leftJoinAndSelect('schedule.client', 'client')
      .leftJoinAndSelect('client.service', 'service')
      .where('schedule.id = :scheduleId', { scheduleId })
      .andWhere('service.userId = :userId', { userId: currentUser.id })
      .getOne();

    if (!schedule) throw new ForbiddenError();

    if (!updated) await schedule.remove();
    else {
      for (const [key, value] of Object.entries(updated) as [
        keyof ScheduleInput,
        string,
      ][])
        schedule[key] = value;
      await schedule.save();
    }

    return schedule.client;
  }
}
