import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateTransactionInput {
  @Field()
  transaction: string;
  @Field()
  amount: string;
  @Field()
  id: string;
}
