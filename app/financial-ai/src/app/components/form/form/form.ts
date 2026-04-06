import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class FormComponent {
  formGroup = input.required<FormGroup>()
  submitText = input<string>('Enviar')
  formClass = input<string>('')
  
  submitEvent = output<void>()

  onSubmit(): void {
    if (this.formGroup().valid) {
      this.submitEvent.emit()
    } else {
      this.formGroup().markAllAsTouched()
    }
  }
}
