// components/register/register.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css', '../auth.css']
})
export class Register {
 registerForm: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    
    return password === confirmPassword ? null : { mismatch: true };
  }

  async onSubmit() {
    if (this.registerForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';
    
    try {
      const { name, email, password } = this.registerForm.value;
      await this.authService.signUp(email, password, { full_name: name });
      
      this.successMessage = 'تم إنشاء الحساب بنجاح! يرجى التحقق من بريدك الإلكتروني لتأكيد الحساب.';
      this.registerForm.reset();
    } catch (error: any) {
      this.errorMessage = error.message || 'حدث خطأ أثناء إنشاء الحساب';
    } finally {
      this.loading = false;
    }
  }
}
