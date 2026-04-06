import { Component, inject, signal, viewChild } from '@angular/core';
import { RegisterForm } from '../register-form/register-form/register-form';
import { LoginForm } from '../login-form/login-form/login-form';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { LoginRequest, UserRegisterRequest } from '../../../models/user.interface';

@Component({
  selector: 'app-login-page',
  imports: [RegisterForm, LoginForm],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  private authService = inject(AuthService)
  private router = inject(Router)

  protected isLoginView = signal<boolean>(true)
  protected errorMessage = signal<string>('')
  protected successMessage = signal<string>('')

  private loginFormRef = viewChild(LoginForm)

  toggleView(): void {
    this.isLoginView.set(!this.isLoginView())
    this.clearMessages()
  }

  onLoginSubmit(request: LoginRequest): void {
    this.authService.login(request).subscribe({
      next: () => { 
        this.router.navigate(['/home'])
      },
      error: (errorResponse) => {
        const msg = errorResponse.error?.message || 'Erro ao fazer login. Verifique suas credenciais.'
        this.showError(msg)
        this.loginFormRef()?.resetPassword()
      },
    });
  }

  onRegisterSubmit(request: UserRegisterRequest): void {
    this.authService.register(request).subscribe({
      next: () => {
        this.isLoginView.set(true)
        this.showSuccess('Conta registrada com sucesso! Faça seu login.')
      },
      error: (errorResponse) => {
        const msg = errorResponse.error?.message || 'Erro ao registrar. Verifique os dados e tente novamente.'
        this.showError(msg)
      },
    });
  }

  private showError(msg: string): void {
    this.errorMessage.set(msg)
    setTimeout(() => this.errorMessage.set(''), 5000)
  }

  private showSuccess(msg: string): void {
    this.successMessage.set(msg)
    setTimeout(() => this.successMessage.set(''), 5000)
  }

  private clearMessages(): void {
    this.errorMessage.set('')
    this.successMessage.set('')
  }
}
