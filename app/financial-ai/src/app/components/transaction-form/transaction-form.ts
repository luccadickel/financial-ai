import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormComponent } from '../form/form/form';
import { TransactionRequest, TransactionResponse, TransactionType } from '../../models/transaction.interface';
import { CategoryResponse } from '../../models/category.interface';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-transaction-form',
  imports: [CommonModule, ReactiveFormsModule, FormComponent],
  templateUrl: './transaction-form.html',
  styleUrl: './transaction-form.css',
})
export class TransactionForm implements OnInit{
  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService); 
  
  closeModal = output<void>();
  saveTransaction = output<TransactionRequest>();
  transactionTypes = TransactionType;

  transactionToEdit = input<TransactionResponse | null>(null);

  categories = signal<CategoryResponse[]>([]);

  transactionForm = this.fb.group({
    description: ['', Validators.required],
    amount: [null as number | null, [Validators.required, Validators.min(0.01)]],
    transactionDate: ['', Validators.required],
    transactionType: [TransactionType.EXPENSE, Validators.required],
    categoryId: [null as number | null, Validators.required] 
  });

  ngOnInit(): void {
    this.loadCategories();

    const editData = this.transactionToEdit();
    if (editData) {
      this.transactionForm.patchValue({
        description: editData.description,
        amount: editData.amount,
        transactionDate: editData.transactionDate as any, 
        transactionType: editData.transactionType,
        categoryId: editData.categoryId || null 
      });
    }
  }

  loadCategories(): void {
    this.categoryService.listCategories().subscribe({
      next: (data) => this.categories.set(data),
      error: (err) => console.error('Erro ao carregar categorias', err)
    });
  }

  onSubmit(): void {
    this.saveTransaction.emit(this.transactionForm.value as unknown as TransactionRequest);
  }
}
