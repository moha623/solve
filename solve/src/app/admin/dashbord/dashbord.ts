// dashbord.component.ts
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';
import { AuthService } from '../../services/auth.service';
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
  mediaPreviews: {url: string, type: string, name: string}[] = [];
  private supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  
  isAuthenticated = false;
  userEmail: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private supabaseService: SupabaseService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
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
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      originalPrice: [0, [Validators.min(0)]],
      discount: [0, [Validators.min(0), Validators.max(100)]],
      rating: [0, [Validators.min(0), Validators.max(5)]],
      reviewCount: [0, [Validators.min(0)]],
      features: [''],
      media_urls: [[], Validators.required], // Changed to array for multiple media
      deliveryFee: [0, [Validators.min(0)]]
    });
  }

   async onMediaSelected(event: any) {
    const files: FileList = event.target.files;
    if (!files || files.length === 0) return;

    this.loading = true;
    this.uploadPercent = 0;
    const totalFiles = files.length;
    let uploadedCount = 0;
    const mediaUrls: string[] = [];

    // Process each file
    for (let i = 0; i < totalFiles; i++) {
      const file = files[i];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      const fileType = file.type.split('/')[0]; // 'image' or 'video'
      const filePath = `products/${Date.now()}_${file.name}`;

      try {
        // Upload the file to Supabase storage
        const { data, error } = await this.supabaseService.uploadImage(filePath, file);
        if (error) throw error;

        // Get the public URL of the uploaded file
        const downloadURL = this.supabaseService.getDownloadURL(filePath);
        mediaUrls.push(downloadURL);
        
        // Add to preview
        this.mediaPreviews.push({
          url: downloadURL,
          type: fileType,
          name: file.name
        });

        uploadedCount++;
        this.uploadPercent = (uploadedCount / totalFiles) * 100;
        
        console.log('Media uploaded successfully:', downloadURL);
      } catch (error: any) {
        console.error('Media upload error:', error);
        this.errorMessage = `خطأ في رفع الملف: ${file.name}: ${error.message}`;
      }
    }

    // Update the form control with all media URLs
    this.productForm.patchValue({ media_urls: mediaUrls });
    this.loading = false;
    this.uploadPercent = null;
  }

  removeMedia(index: number) {
    this.mediaPreviews.splice(index, 1);
    const currentUrls = this.productForm.get('media_urls')?.value || [];
    currentUrls.splice(index, 1);
    this.productForm.patchValue({ media_urls: currentUrls });
  }

  async onSubmit() {
    if (this.loading) return;
    
    // Mark all fields as touched to show validation messages
    if (this.productForm.invalid) {
      Object.keys(this.productForm.controls).forEach(key => {
        this.productForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    try {
      // Prepare the product data
      const formValue = this.productForm.value;
      const productData = {
        id: this.generateId(),
        name: formValue.name,
        description: formValue.description,
        price: formValue.price,
        originalPrice: formValue.originalPrice > 0 ? formValue.originalPrice : null,
        discount: formValue.discount > 0 ? formValue.discount : null,
        rating: formValue.rating,
        reviewCount: formValue.reviewCount,
        features: formValue.features ? 
          formValue.features.split(',').map((f: string) => f.trim()).filter((f: string) => f.length > 0) 
          : [],
        media_urls: formValue.media_urls, // Now an array of URLs
        deliveryFee: formValue.deliveryFee
      };

      console.log('Submitting product:', productData);

      // Check if media_urls is defined and has at least one item
      if (!productData.media_urls || productData.media_urls.length === 0) {
        throw new Error('At least one media file is required');
      }

      const { data, error } = await this.supabaseService.insertProduct(productData);

      if (error) {
        console.error('Insert error:', error);
        throw error;
      }

      this.successMessage = 'تم إضافة المنتج بنجاح';
      this.resetForm();
    } catch (error: any) {
      console.error('Submit error:', error);
      if (error.message.includes('NavigatorLockAcquireTimeoutError')) {
        this.errorMessage = 'تم انتهاء وقت الانتظار، يرجى المحاولة مرة أخرى';
      } else {
        this.errorMessage = error.message || 'حدث خطأ أثناء إضافة المنتج';
      }
    } finally {
      this.loading = false;
    }
  }

  generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  resetForm() {
    this.productForm.reset({
      price: 0,
      originalPrice: 0,
      discount: 0,
      rating: 0,
      reviewCount: 0,
      features: '',
      media_urls: [],
      deliveryFee: 0
    });
    this.successMessage = '';
    this.errorMessage = '';
    this.mediaPreviews = [];
  }

      handleImageError(event: any) {
    event.target.src = 'path/to/placeholder/image.jpg';
  }
}  


// handleImageError(event: any) {
//     event.target.src = 'path/to/placeholder/image.jpg';
//   } 


// (change)="onFileSelected($event)"