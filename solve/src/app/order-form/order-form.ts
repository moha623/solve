import { Component, Input } from '@angular/core';
 import { DecimalPipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { BrowserModule } from '@angular/platform-browser';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-order-form',
  imports: [ReactiveFormsModule, ],
  templateUrl: './order-form.html',
  styleUrl: './order-form.css'
})
export class OrderForm {
  @Input() product!: Product;
  @Input() quantity!: number;
  orderForm!: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.createForm();
  }

  ngOnInit() {
    // Ensure quantity is at least 1
    if (!this.quantity || this.quantity < 1) {
      this.quantity = 1;
    }
  }

  createForm() {
    this.orderForm = this.fb.group({
      name: ['', Validators.required],
      // phone: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      address: ['', Validators.required]
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
        delivery_fee: this.product.deliveryFee || 0
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
