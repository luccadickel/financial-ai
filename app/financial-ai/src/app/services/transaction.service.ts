import { inject, Injectable, signal } from '@angular/core';
import { TransactionRequest, TransactionResponse, TransactionUpdateRequest } from '../models/transaction.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { PageResponse } from '../models/page.interface';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  
  transactions = signal<PageResponse<TransactionResponse> | null>(null);
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

  public listTransactions(
    page: number = 0, 
    size: number = 10, 
    sort: string = 'transactionDate,desc', 
    filters: any = {}
  ): Observable<PageResponse<TransactionResponse>> {

    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', sort);

    if (filters.categoryId) params = params.set('categoryId', filters.categoryId);
    if (filters.type) params = params.set('type', filters.type);
    if (filters.month) params = params.set('month', filters.month);
    if (filters.year) params = params.set('year', filters.year);

    return this.http.get<PageResponse<TransactionResponse>>(`${this.apiUrl()}/transactions`, { params })
      .pipe(
        tap((pageData) => this.transactions.set(pageData))
      );
  }
}
