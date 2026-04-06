import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormComponent } from '../../../../components/form/form/form';
import { UserRegisterRequest } from '../../../../models/user.interface';
import { passwordMatchValidator } from '../../../../shared/validators/password-match.validator';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule, FormComponent],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
})
export class RegisterForm {
  submitRegister = output<UserRegisterRequest>()
  goToLogin = output<void>()

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]), 
  }, { validators: passwordMatchValidator })

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formValues = this.registerForm.getRawValue()
      
      const requestData: UserRegisterRequest = {
        name: formValues.name as string,
        email: formValues.email as string,
        password: formValues.password as string
      }
      
      this.submitRegister.emit(requestData)
    } else {
      this.registerForm.markAllAsTouched()
    }
  }
}
