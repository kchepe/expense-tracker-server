import { Field, ID, InputType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends CreateUserInput {
  @Field(() => ID)
  id: string;
}
