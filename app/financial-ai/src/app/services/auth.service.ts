import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse, UserRegisterRequest, UserResponse } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  public user = signal<UserResponse | null>(null)

  public apiUrl = signal<String>('http://localhost:8080')

  private http = inject(HttpClient)

  private router = inject(Router)

  public login(request: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl()}/login`, request)
      .pipe(
        tap((answer) => {
          if (answer && answer.token) {
            this.saveToken(answer.token)
            this.router.navigate(['/home'])
          }
        })
      )
  }

  public register(request: UserRegisterRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.apiUrl()}/users`, request)
  }

  public saveToken(token: string): void {
    localStorage.setItem('token', token)
  }

  public getUser(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl()}/users/me`).pipe(
      tap(userData => this.user.set(userData))
    )
  }

  public getToken(): string | null {
    return localStorage.getItem('token')
  }

  public hasToken(): boolean {
    return !!this.getToken()
  }

  public isAuthenticated(): boolean {
    return this.hasToken()
  }

  logout(silent = false): void {
    localStorage.removeItem('token') 
    this.user.set(null)
    if (!silent) this.router.navigate(['/login'])
  }
}
