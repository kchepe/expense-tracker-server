import { Field, ObjectType, ID } from '@nestjs/graphql';
import { TransactionType, Transactions } from '@prisma/client';

@ObjectType()
export class Transaction implements Transactions {
  @Field(() => ID)
  id: string;
  @Field()
  userId: string;
  @Field()
  transaction: string;
  @Field()
  amount: string;
  @Field()
  date: Date;
  @Field()
  transactionType: TransactionType;
}

@ObjectType()
export class TransactionResponse {
  @Field()
  success: boolean;
  @Field()
  message: string;
  @Field()
  data: Transaction;
}

@ObjectType()
export class TransactionsWithTotalAmountResponse {
  @Field(() => [Transaction])
  transactions: Transaction[];
  @Field()
  expense: number;
  @Field()
  income: number;
  @Field()
  balance: number;
}
