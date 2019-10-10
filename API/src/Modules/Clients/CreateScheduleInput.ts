// API/src/Modules/Clients/CreateScheduleInput.ts
import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateScheduleInput {
  @Field()
  time: string;
}
