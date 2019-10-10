// API/src/Modules/Services/ServiceInput.ts
import { InputType, Field } from 'type-graphql';
import { Service } from './ServiceModel';

@InputType()
export class ServiceInput implements Partial<Service> {
  @Field()
  name: string;
}
