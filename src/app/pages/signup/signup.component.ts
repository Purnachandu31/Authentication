import { Component,inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, NgIf],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  authService = inject(AuthService);
  router = inject(Router);

  protected signupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  onSubmit() {
    if (this.signupForm.valid) {
      const { name, email, password } = this.signupForm.value;
      
      this.authService.signup({ name, email, password }).subscribe({
        next: (data: any) => {
          console.log('User created:', data);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error during signup:', error);
          // Handle specific error scenarios
          if (error.status === 400) {
            alert('Validation failed. Please check your input.');
          } else if (error.status === 500) {
            alert('Server error. Please try again later.');
          }
        }
      });
    }
  }
}
