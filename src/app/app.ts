import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule, PasswordModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  email = '';
  password = '';
  errorMessage = '';
  isLoading = false;
  successMessage = '';

  onLogin(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.email.trim() || !this.password) {
      this.errorMessage = 'Please enter your email and password.';
      return;
    }

    this.isLoading = true;

    this.authService
      .login({
        email: this.email.trim(),
        password: this.password,
      })
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.successMessage =
            'Login successful! Your authentication token has been saved.';
        },
        error: (error) => {
          this.isLoading = false;

          if (error.status === 0) {
            this.errorMessage =
              'Cannot reach the backend. Check that Spring Boot is running and the API URL is correct.';
          } else if (error.status === 401) {
            this.errorMessage = 'Invalid email or password.';
          } else if (error.status === 403) {
            this.errorMessage =
              'Access denied. Your account may require email verification.';
          } else {
            this.errorMessage =
              error.error?.message || 'Login failed. Please try again.';
          }
        },
      });
  }
}