import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Users } from '@prisma/client';

@ObjectType()
export class UserTypes implements Users {
  @Field(() => ID)
  id: string;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  password: string;
  @Field()
  email: string;
}
