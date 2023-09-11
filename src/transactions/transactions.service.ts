import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransactionInput } from './dto/add-transaction.input';
import { Transaction } from './transaction.model';
import { TransactionType } from '@prisma/client';
import { UpdateTransactionInput } from './dto/edit.transaction.input';

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  public async addTransaction(newTransaction: CreateTransactionInput) {
    const currentDate = new Date();
    const transaction = await this.prisma.transactions.create({
      data: { ...newTransaction, date: currentDate },
    });
    return {
      success: true,
      message: 'Transaction successfully added!',
      data: transaction,
    };
  }

  public async getTransactionById(userId: string) {
    const transactions = await this.prisma.transactions.findMany({
      where: { userId },
    });

    const expense = this.getTotal(transactions, 'expense');
    const income = this.getTotal(transactions, 'income');

    return { transactions, expense, income, balance: income - expense };
  }
  public async removeTransaction(id: string) {
    await this.prisma.transactions.delete({
      where: { id },
    });
    return {
      success: true,
      message: 'Transaction successfully deleted!',
      data: { id },
    };
  }

  public async updateTransaction(newTransaction: UpdateTransactionInput) {
    const { id, ...props } = newTransaction;
    await this.prisma.transactions.update({
      where: { id },
      data: props,
    });
    return {
      success: true,
      message: 'Transaction successfully update!',
      data: { id },
    };
  }

  private getTotal(transaction: Transaction[], type: TransactionType) {
    const filteredTransaction = transaction
      .filter((val) => val.transactionType === type)
      .map((val) => parseFloat(val.amount.replace(/,/g, '')));

    if (transaction.length === 0 || filteredTransaction.length === 0) {
      return 0;
    }

    const totalAmount = filteredTransaction.reduce((a, b) => a + b);

    return totalAmount;
  }
}
