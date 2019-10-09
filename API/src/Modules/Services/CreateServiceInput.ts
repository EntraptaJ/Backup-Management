// API/src/Modules/Backups/CreateBackupInput.ts
import { InputType, Field } from 'type-graphql';
import { Service } from './ServiceModel';

@InputType()
export class CreateServiceInput implements Partial<Service> {
  @Field()
  name: string;
}
