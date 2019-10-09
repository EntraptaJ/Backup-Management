// API/src/Modules/Clients/CreateClientInput.ts
import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateClientInput {
  @Field()
  path: string;
}
