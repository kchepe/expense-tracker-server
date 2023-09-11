import { Field, ID, ObjectType } from '@nestjs/graphql';

export type IUserType =
  | 'broker'
  | 'owner'
  | 'agent'
  | 'developer'
  | 'brokerage';

@ObjectType()
export class UserResponse {
  @Field(() => ID)
  id: string;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  email: string;
}

@ObjectType()
export class LoginResponse {
  @Field()
  token: string;
  @Field()
  user: UserResponse;
}
