// components/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css', '../auth.css'],
})
export class Login {
  loginForm: FormGroup;
  loading = false;
  errorMessage = '';
  showMagicLinkMessage = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
    });
  }

  async onSubmit() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';

    try {
      const { email, password } = this.loginForm.value;
      await this.authService.signIn(email, password);
      // Navigation is handled by the auth state change listener
    } catch (error: any) {
      this.errorMessage = error.message || 'حدث خطأ أثناء تسجيل الدخول';
    } finally {
      this.loading = false;
    }
  }

  async signInWithMagicLink() {
    const email = this.loginForm.get('email')?.value;
    if (!email || !this.loginForm.get('email')?.valid) {
      this.errorMessage = 'يرجى إدخال بريد إلكتروني صحيح';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    try {
      await this.authService.signInWithMagicLink(email);
      this.showMagicLinkMessage = true;
    } catch (error: any) {
      this.errorMessage = error.message || 'حدث خطأ أثناء إرسال رابط الدخول';
    } finally {
      this.loading = false;
    }
  }
}
