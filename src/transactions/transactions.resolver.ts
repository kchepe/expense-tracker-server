import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TransactionsService } from './transactions.service';
import { CreateTransactionInput } from './dto/add-transaction.input';
import {
  TransactionResponse,
  TransactionsWithTotalAmountResponse,
} from './transaction.model';
import { UpdateTransactionInput } from './dto/edit.transaction.input';

@Resolver()
@UseGuards(JwtAuthGuard)
export class TransactionsResolver {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Mutation(() => TransactionResponse)
  addTransaction(
    @Args('newTransaction') newTransaction: CreateTransactionInput,
  ) {
    return this.transactionsService.addTransaction(newTransaction);
  }

  @Query(() => TransactionsWithTotalAmountResponse)
  getTransaction(@Args('userId') userId: string) {
    return this.transactionsService.getTransactionById(userId);
  }

  @Mutation(() => TransactionResponse)
  removeTransaction(@Args('transactionId') transactionId: string) {
    return this.transactionsService.removeTransaction(transactionId);
  }

  @Mutation(() => TransactionResponse)
  updateTransaction(
    @Args('newTransaction') newTransaction: UpdateTransactionInput,
  ) {
    return this.transactionsService.updateTransaction(newTransaction);
  }
}
