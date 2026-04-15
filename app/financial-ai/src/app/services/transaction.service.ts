import { inject, Injectable, signal } from '@angular/core';
import { TransactionRequest, TransactionResponse, TransactionUpdateRequest } from '../models/transaction.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Transaction {
  
  public transactions = signal<TransactionResponse[]>([])
  public apiUrl = signal<String>('http://localhost:8080')

  private http = inject(HttpClient)

  public includeTransaction(request: TransactionRequest): Observable<TransactionResponse> {
    return this.http.post<TransactionResponse>(`${this.apiUrl()}/transactions`, request)
  }

  public updateTransaction(transactionId: number, request: TransactionUpdateRequest): Observable<TransactionResponse> {
    return this.http.put<TransactionResponse>(`${this.apiUrl()}/transactions/${transactionId}`, request)
  }

  public deleteTransaction(transactionId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl()}/transactions/${transactionId}`)
  }

  public listTransactions(): Observable<TransactionResponse[]> {
    return this.http.get<TransactionResponse[]>(`${this.apiUrl()}/transactions`)
    .pipe(
      tap((transactionsList) => this.transactions.set(transactionsList))
    )
  }
}
