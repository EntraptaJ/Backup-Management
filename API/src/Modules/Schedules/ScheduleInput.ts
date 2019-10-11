// API/src/Modules/Schedules/ScheduleInput.ts
import { InputType, Field } from 'type-graphql';
import { Schedule } from './ScheduleModel';

@InputType()
export class ScheduleInput implements Partial<Schedule> {
  @Field({ nullable: true })
  time?: string;
}
