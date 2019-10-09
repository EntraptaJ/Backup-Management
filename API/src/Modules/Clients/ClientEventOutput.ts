// API/src/Modules/Clients/ClientEventOutput.ts
import { registerEnumType, ObjectType, Field } from 'type-graphql';

export enum ClientEventType {
  BACKUP = 'BACKUP',
}

registerEnumType(ClientEventType, { name: 'ClientEventType' });

@ObjectType()
export class ClientEvent {
  @Field(() => ClientEventType)
  type: ClientEventType;
}
