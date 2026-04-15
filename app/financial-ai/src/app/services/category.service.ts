import { inject, Injectable, signal } from '@angular/core';
import { CategoryRequest, CategoryResponse } from '../models/category.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  
  public categories = signal<CategoryResponse[]>([])
  public apiUrl = signal<String>('http://localhost:8080')

  private http = inject(HttpClient)

  public createCategory(request: CategoryRequest): Observable<CategoryResponse> {
    return this.http.post<CategoryResponse>(`${this.apiUrl()}/categories`, request)
  }
  
  public deleteCategory(categoryId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl()}/categories/${categoryId}`)
  }

  public listCategories(): Observable<CategoryResponse[]> {
    return this.http.get<CategoryResponse[]>(`${this.apiUrl()}/categories`)
    .pipe(
      tap((categoriesList) => this.categories.set(categoriesList))
    )
  }
}
