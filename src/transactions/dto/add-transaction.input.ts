import { Field, InputType } from '@nestjs/graphql';
import { TransactionType } from '@prisma/client';

@InputType()
export class CreateTransactionInput {
  @Field()
  transaction: string;
  @Field()
  amount: string;
  @Field()
  userId: string;
  @Field()
  transactionType: TransactionType;
}
