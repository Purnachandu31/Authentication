import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule, RouterModule ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  protected loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
      .subscribe({
        next: (data: any) => {
          if (data.token && data.username) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username); // Store username here
            this.router.navigate(['/dashboard']);
          }
          console.log(data);
        },
        error: (err) => {
          console.error('Login error:', err);
        }
      });
    }
  }
  
}
