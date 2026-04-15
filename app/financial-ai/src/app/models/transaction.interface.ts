export enum TransactionType {
  EXPENSE = 'EXPENSE',
  INCOME = 'INCOME'
}                                 
                                  
export interface TransactionRequest {
  amount: number,
  transactionDate: string,
  categoryId: number,
  description: string
  transactionType: TransactionType
}

export interface TransactionResponse {
  id: number,
  categoryId: number,
  categoryName: string,
  amount: number,
  transactionDate: string,
  description: string, 
  transactionType: TransactionType,
  createdAt: string,
  updatedAt: string
}

export interface TransactionUpdateRequest {
  amount: number,
  transactionDate: string,
  categoryId: number,
  description: string, 
  transactionType: TransactionType
}