// API/src/Modules/Clients/ClientInput.ts
import { InputType, Field } from 'type-graphql';
import { Client } from './ClientModel';

@InputType()
export class ClientInput implements Partial<Client> {
  @Field()
  path: string;
}
