import { Component, output } from '@angular/core';
import { LoginRequest } from '../../../../models/user.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormComponent } from '../../../../components/form/form/form';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, FormComponent],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  submitLogin = output<LoginRequest>()
  goToRegister = output<void>()

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]), 
    password: new FormControl('', Validators.required),
  })

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.submitLogin.emit(this.loginForm.getRawValue() as LoginRequest)
    }
  }

  resetPassword(): void {
    this.loginForm.get('password')?.reset()
  }
}
