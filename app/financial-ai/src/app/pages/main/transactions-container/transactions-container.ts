import { Component, inject, OnInit, signal } from '@angular/core';
import { TransactionsTable } from '../../../components/transactions-table/transactions-table';
import { TransactionService } from '../../../services/transaction.service';
import { TransactionRequest, TransactionResponse } from '../../../models/transaction.interface';
import { TransactionForm } from '../../../components/transaction-form/transaction-form';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transactions-container',
  imports: [TransactionsTable, TransactionForm, FormsModule, CommonModule],
  templateUrl: './transactions-container.html',
  styleUrl: './transactions-container.css',
})
export class TransactionsContainer implements OnInit{

  private transactionService = inject(TransactionService);
  
  transactions = this.transactionService.transactions;

  isModalOpen = signal<boolean>(false);
  transactionToEdit = signal<TransactionResponse | null>(null);
  transactionToDelete = signal<TransactionResponse | null>(null);

  currentPage = 0;
  pageSize = 10;
  currentSort = 'transactionDate,desc';
  
  filterCategory: number | null = null;
  filterType: string = '';
  filterMonthYear: string = '';

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    let month = null;
    let year = null;

    if (this.filterMonthYear) {
      const parts = this.filterMonthYear.split('-');
      year = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10);
    }

    const filters = {
      categoryId: this.filterCategory,
      type: this.filterType || null,
      month: month,
      year: year
    };

    this.transactionService.listTransactions(this.currentPage, this.pageSize, this.currentSort, filters)
      .subscribe({
        error: (err) => console.error('Erro ao buscar transações paginadas:', err)
      });
  }

  applyFilters(): void {
    this.currentPage = 0; 
    this.loadTransactions();
  }

  clearFilters(): void {
    this.filterCategory = null;
    this.filterType = '';
    this.filterMonthYear = '';
    this.applyFilters();
  }

  changePage(newPage: number): void {
    this.currentPage = newPage;
    this.loadTransactions();
  }

  changeSort(field: string): void {
    if (this.currentSort.startsWith(field)) {
      const dir = this.currentSort.endsWith('desc') ? 'asc' : 'desc';
      this.currentSort = `${field},${dir}`;
    } else {
      this.currentSort = `${field},desc`;
    }
    this.currentPage = 0;
    this.loadTransactions();
  }

  openNewTransactionForm(): void {
    this.transactionToEdit.set(null);
    this.isModalOpen.set(true);
  }

  openEditTransactionForm(transaction: TransactionResponse): void {
    this.transactionToEdit.set(transaction);
    this.isModalOpen.set(true);
  }

  closeNewTransactionForm(): void {
    this.isModalOpen.set(false);
    this.transactionToEdit.set(null);
  }

  onSaveTransaction(request: TransactionRequest): void {
    const currentEdit = this.transactionToEdit();
    
    if (currentEdit) {
      this.transactionService.updateTransaction(currentEdit.id, request as any).subscribe({
        next: () => {
          this.closeNewTransactionForm();
          this.loadTransactions();
        },
        error: (err) => console.error('Erro ao atualizar:', err)
      });
    } else {
      this.transactionService.includeTransaction(request).subscribe({
        next: () => {
          this.closeNewTransactionForm();
          this.loadTransactions(); 
        },
        error: (err) => console.error('Erro ao salvar:', err)
      });
    }
  }

  openDeleteConfirm(transaction: TransactionResponse): void {
    this.transactionToDelete.set(transaction);
  }

  closeDeleteConfirm(): void {
    this.transactionToDelete.set(null);
  }

  confirmDelete(): void {
    const transaction = this.transactionToDelete();
    if (transaction) {
      this.transactionService.deleteTransaction(transaction.id).subscribe({
        next: () => {
          this.closeDeleteConfirm();
          this.loadTransactions();
        },
        error: (err) => console.error('Erro ao apagar:', err)
      });
    }
  }
}
