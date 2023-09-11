import { Module } from '@nestjs/common';
import { TransactionsResolver } from './transactions.resolver';
import { TransactionsService } from './transactions.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [TransactionsResolver, TransactionsService],
  imports: [PrismaModule],
})
export class TransactionsModule {}
