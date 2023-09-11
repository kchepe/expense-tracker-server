import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class SignupInput {
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  password: string;
  @Field()
  email: string;
}

@ObjectType()
class UserData {
  @Field()
  id: string;
  @Field()
  email: string;
  @Field()
  password: string;
}

@ObjectType()
export class SignupResponse {
  @Field()
  success: boolean;
  @Field()
  message: string;
  @Field({ nullable: true })
  data: UserData;
}
