import { Component, input, output } from '@angular/core';
import { TransactionResponse, TransactionType } from '../../models/transaction.interface';
import { CommonModule } from '@angular/common';
import { PageResponse } from '../../models/page.interface';

@Component({
  selector: 'app-transactions-table',
  imports: [CommonModule],
  templateUrl: './transactions-table.html',
  styleUrl: './transactions-table.css',
})
export class TransactionsTable {

  pageData = input<PageResponse<TransactionResponse> | null>(null);

  onPageChange = output<number>();
  onSort = output<string>();

  onEdit = output<TransactionResponse>();
  onDelete = output<TransactionResponse>();

  translateType(type: TransactionType): string {
    if (type === TransactionType.INCOME) {
      return 'Receita';
    }
    if (type === TransactionType.EXPENSE) {
      return 'Despesa';
    }
    return type; 
  }
}
