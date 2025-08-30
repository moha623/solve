import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';
import { AuthService } from '../../services/auth';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../../envirement/environment';

@Component({
  selector: 'app-dashbord',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dashbord.html',
  styleUrls: ['./dashbord.css'],
})
export class Dashbord implements OnInit {
  productForm!: FormGroup;
  loading = false;
  successMessage = '';
  errorMessage = '';
  uploadPercent: number | null = null;
  downloadURL: string | null = null;
  private supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  
  // Add authentication state
  isAuthenticated = false;
  userEmail: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private supabaseService: SupabaseService,
    private authService: AuthService // Inject AuthService
  ) {}

  async ngOnInit() {
    // Check authentication status
    this.authService.authStateChanged.subscribe(state => {
      this.isAuthenticated = state;
      if (state) {
        this.userEmail = this.authService.user?.email || null;
      }
    });

    const { data: buckets, error } = await this.supabase.storage.listBuckets();
    console.log(buckets);
    
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      image: [null, Validators.required],
    });
  }

  async onFileSelected(event: any) {
    // if (!this.isAuthenticated) {
    //   this.errorMessage = 'يجب تسجيل الدخول أولاً';
    //   return;
    // }

    const file: File = event.target.files[0];
    if (!file) return;

    this.loading = true;
    this.uploadPercent = 0;
    const filePath = `products/${Date.now()}_${file.name}`;

    try {
      const { data, error } = await this.supabaseService.uploadImage(filePath, file);
      if (error) throw error;

      this.downloadURL = this.supabaseService.getDownloadURL(filePath);
      this.productForm.patchValue({ image: this.downloadURL });
    } catch (error: any) {
      this.errorMessage = 'خطأ في رفع الصورة: ' + error.message;
    } finally {
      this.loading = false;
      this.uploadPercent = null;
    }
  }

  async onSubmit() {
    // if (!this.isAuthenticated) {
    //   this.errorMessage = 'يجب تسجيل الدخول أولاً';
    //   return;
    // }

    if (this.productForm.invalid) return;

    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const productData = this.productForm.value;
    console.log('Submitting Product:', productData);
    
    try {
      const { data, error } = await this.supabaseService.insertProduct(productData);
      
      if (error) {
        console.error('Insert error:', error);
        throw error;
      }
      
      this.successMessage = 'تم إضافة المنتج بنجاح';
      this.productForm.reset();
      this.downloadURL = null;
    } catch (error: any) {
      if (error.message.includes('NavigatorLockAcquireTimeoutError')) {
        this.errorMessage = 'تم انتهاء وقت الانتظار، يرجى المحاولة مرة أخرى';
      } else {
        this.errorMessage = error.message || 'حدث خطأ أثناء إضافة المنتج';
      }
    } finally {
      this.loading = false;
    }
  }

  resetForm() {
    this.productForm.reset();
    this.successMessage = '';
    this.errorMessage = '';
    this.downloadURL = null;
  }

  // Add login method
  async login(email: string, password: string) {
    try {
      await this.authService.signIn(email, password);
    } catch (error: any) {
      this.errorMessage = error.message || 'حدث خطأ أثناء تسجيل الدخول';
    }
  }

  // Add logout method
  async logout() {
    try {
      await this.authService.signOut();
    } catch (error: any) {
      this.errorMessage = error.message || 'حدث خطأ أثناء تسجيل الخروج';
    }
  }
}