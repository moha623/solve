import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';
import { AuthService } from '../../services/auth.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-dashbord',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './dashbord.html',
  styleUrls: ['./dashbord.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 })),
      ]),
    ]),
  ],
})
export class Dashbord implements OnInit {
  productForm!: FormGroup;
  loading = false;
  successMessage = '';
  errorMessage = '';
  uploadPercent: number | null = null;
  mediaPreviews: { url: string; type: string; name: string }[] = [];

  products: any[] = [];
  totalProducts = 247;
  currentPage = 1;
  itemsPerPage = 8;
  totalPages = Math.ceil(this.totalProducts / this.itemsPerPage);
  showDeleteModal = false;
  selectedProduct: any = null;

  showToast = false;
  toastMessage = '';

  constructor(
    private fb: FormBuilder,
    private supabaseService: SupabaseService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      originalPrice: [0, [Validators.min(0)]],
      discount: [0, [Validators.min(0), Validators.max(100)]],
      rating: [0, [Validators.min(0), Validators.max(5)]],
      reviewCount: [0, [Validators.min(0)]],
      features: [''],
      media_urls: [[], Validators.required],
      deliveryFee: [0, [Validators.min(0)]],
    });

    this.loadProducts();
  }

  async onMediaSelected(event: any) {
    const files: FileList = event.target.files;
    if (!files || files.length === 0) return;

    this.loading = true;
    this.uploadPercent = 0;
    const totalFiles = files.length;
    let uploadedCount = 0;
    const mediaUrls: string[] = [];

    for (let i = 0; i < totalFiles; i++) {
      const file = files[i];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      const fileType = file.type.split('/')[0];
      const filePath = `products/${Date.now()}_${file.name}`;

      try {
        const { data, error } = await this.supabaseService.uploadImage(filePath, file);
        if (error) throw error;

        const downloadURL = this.supabaseService.getDownloadURL(filePath);
        mediaUrls.push(downloadURL);

        this.mediaPreviews.push({
          url: downloadURL,
          type: fileType,
          name: file.name,
        });

        uploadedCount++;
        this.uploadPercent = (uploadedCount / totalFiles) * 100;
      } catch (error: any) {
        console.error('Media upload error:', error);
        this.errorMessage = `خطأ في رفع الملف: ${file.name}: ${error.message}`;
      }
    }

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

    if (this.productForm.invalid) {
      Object.keys(this.productForm.controls).forEach((key) => {
        this.productForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    try {
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
        features: formValue.features
          ? formValue.features
              .split(',')
              .map((f: string) => f.trim())
              .filter((f: string) => f.length > 0)
          : [],
        media_urls: formValue.media_urls,
        deliveryFee: formValue.deliveryFee,
      };

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
      deliveryFee: 0,
    });
    this.successMessage = '';
    this.errorMessage = '';
    this.mediaPreviews = [];
  }

  handleImageError(event: any) {
    event.target.src = 'path/to/placeholder/image.jpg';
  }

  async loadProducts(): Promise<void> {
    try {
      const { products, totalCount } = await this.supabaseService.getProducts(
        this.currentPage,
        this.itemsPerPage
      );
      this.products = products;
      this.totalProducts = totalCount || 0;
      this.totalPages = Math.ceil(this.totalProducts / this.itemsPerPage);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }

  openDeleteModal(product: any): void {
    this.selectedProduct = product;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.selectedProduct = null;
  }

  async confirmDelete(): Promise<void> {
    if (this.selectedProduct) {
      try {
        await this.supabaseService.deleteProduct(this.selectedProduct.id);
        this.showToastMessage(
          `Product "${this.selectedProduct.name}" has been deleted successfully`
        );
        this.closeDeleteModal();
        this.loadProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        this.showToastMessage('Error deleting product. Please try again.');
      }
    }
  }

  showToastMessage(message: string): void {
    this.toastMessage = message;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadProducts();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadProducts();
    }
  }

  getStatusClass(product: any): string {
    const stock = product.stock || 0;
    if (stock > 10) {
      return 'bg-green-100 text-green-800';
    } else if (stock > 0) {
      return 'bg-yellow-100 text-yellow-800';
    } else {
      return 'bg-red-100 text-red-800';
    }
  }

  getStatusText(product: any): string {
    const stock = product.stock || 0;
    if (stock > 10) {
      return 'نشط';
    } else if (stock > 0) {
      return 'مخزون منخفض';
    } else {
      return 'نفذ من المخزون';
    }
  }


 

// Returns the array of page numbers for generating buttons
totalPagesArray(): number[] {
  return Array(this.totalPages)
    .fill(0)
    .map((_, i) => i + 1);
}

// Navigate to page n and reload products
gotoPage(page: number): void {
  if (page !== this.currentPage) {
    this.currentPage = page;
    this.loadProducts();
  }
}

 

// Calculate start item number on current page (1-based)
startItem(): number {
  return (this.currentPage - 1) * this.itemsPerPage + 1;
}

// Calculate end item number on current page
endItem(): number {
  const end = this.currentPage * this.itemsPerPage;
  return end > this.totalProducts ? this.totalProducts : end;
}

}