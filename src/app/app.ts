import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule, PasswordModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  email = '';
  password = '';
  errorMessage = '';

  onLogin(): void {
    this.errorMessage = '';

    if (!this.email.trim() || !this.password) {
      this.errorMessage = 'Please enter your email and password.';
      return;
    }

    // We will connect this to the Spring Boot API next.
    this.errorMessage = 'Login form is ready. Backend connection comes next.';
  }
}
