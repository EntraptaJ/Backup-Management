// API/src/Modules/Services/ServiceOutput.ts
import { ObjectType, Field } from 'type-graphql';
import { CurrentUser } from '../Auth/CurrentUser';

@ObjectType()
export class ServiceOutput {
  @Field(() => CurrentUser)
  currentUser: CurrentUser;
}
