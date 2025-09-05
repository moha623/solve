import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  @Input() product!: Product;

  selectedImageIndex: number = 0;
  imagePlaceholder: string =
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=1064&q=80';

  @Input() quantity!: number;
  orderForm!: FormGroup;
  // Sample additional images (in a real app, these would come from the product data)
  additionalImages: string[] = [
    'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
  ];
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.createForm();
  }
  ngOnInit() {
    // If product has additional images, use them instead of sample images
    if (this.product && this.product['media_urls'] && this.product['media_urls'].length > 1) {
      this.additionalImages = this.product['media_urls'].slice(1);
    }
    if (!this.quantity || this.quantity < 1) {
      this.quantity = 1;
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity() {
    this.quantity++;
  }

  get totalPrice(): number {
    return this.product.price * this.quantity;
  }

  getStarsArray(rating: number): number[] {
    const totalStars = 5;
    return Array.from({ length: totalStars }, (_, i) => i + 1);
  }

  // handleImageError(event: any) {
  //   event.target.src = this.imagePlaceholder;
  // }

  selectImage(index: number) {
    this.selectedImageIndex = index;
  }

  get mainImage(): string {
    if (this.selectedImageIndex === 0) {
      return this.product.media_urls[1] || this.imagePlaceholder;
    } else {
      return this.additionalImages[this.selectedImageIndex - 1] || this.imagePlaceholder;
    }
  }

  goBackToShopping() {
    this.router.navigate(['/']);
  }

  // order-form-component

  createForm() {
    this.orderForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\+216[0-9]{8}$/)]],
      address: ['', Validators.required],
    });
  }

  get subtotal(): number {
    return this.product.price * this.quantity;
  }

  get total(): number {
    return this.subtotal + (this.product.deliveryFee || 0);
  }

  async onSubmit() {
    if (this.orderForm.valid) {
      const order = {
        product_id: this.product.id,
        product_name: this.product.name,
        quantity: this.quantity,
        customer_name: this.orderForm.value.name,
        customer_phone: this.orderForm.value.phone,
        customer_address: this.orderForm.value.address,
        total_price: this.total,
        subtotal: this.subtotal,
        delivery_fee: this.product.deliveryFee || 0,
      };

      try {
        await this.productService.createOrder(order);
        alert('تم استلام طلبك بنجاح!');
        this.orderForm.reset();
      } catch (error) {
        console.error('Error creating order:', error);
        alert('حدث خطأ أثناء تقديم الطلب. يرجى المحاولة مرة أخرى.');
      }
    } else {
      alert('يرجى ملء جميع الحقول المطلوبة بشكل صحيح');
    }
  }

  handleImageError(event: any) {
    event.target.src = 'path/to/placeholder/image.jpg';
  }
}
