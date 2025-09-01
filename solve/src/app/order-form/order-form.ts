import { Component, Input } from '@angular/core';
 
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

  createForm() {
    this.orderForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  get subtotal(): number {
    return this.product.price * this.quantity;
  }

  get total(): number {
    return this.subtotal + this.product.deliveryFee;
  }

  onSubmit() {
    if (this.orderForm.valid) {
      const order = {
        product_id: this.product.id,
        product_name: this.product.name,
        quantity: this.quantity,
        customer_name: this.orderForm.value.name,
        customer_phone: this.orderForm.value.phone,
        customer_address: this.orderForm.value.address,
        total_price: this.total
      };

      this.productService.createOrder(order).then(() => {
        alert('تم استلام طلبك بنجاح!');
      }).catch(error => {
        console.error('Error creating order:', error);
      });
    } else {
      alert('يرجى ملء جميع الحقول المطلوبة');
    }
  }
}
