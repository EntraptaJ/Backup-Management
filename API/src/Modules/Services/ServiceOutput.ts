// API/src/Modules/Services/ServiceOutput.ts
import { ObjectType, Field } from 'type-graphql';
import { Service } from './ServiceModel';

@ObjectType()
export class ServiceOutput {
  @Field(() => [Service])
  services: Promise<Service[]>;

  @Field(() => Service)
  service: Service;
}
