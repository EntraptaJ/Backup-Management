// API/src/Modules/Clients/ClientOutput.ts
import { ObjectType, Field } from 'type-graphql';
import { Service } from '../Services/ServiceModel';

@ObjectType()
export class ClientOutput {
  @Field(() => Service)
  service: Service | Promise<Service>;
}
