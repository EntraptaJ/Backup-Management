// API/src/Modules/Auth/CurrentUser.ts
import { Field, ObjectType } from 'type-graphql';
import { User } from 'API/Modules/Users/UserModel';
import { UserRole } from '../Users/UserRole';
import { Service } from '../Services/ServiceModel';

@ObjectType()
export class CurrentUser extends User {
  @Field()
  email: string;

  @Field(() => UserRole)
  roles: UserRole[];

  @Field(() => [Service])
  services: Promise<Service[]>;
}
