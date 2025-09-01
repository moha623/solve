import { Component, Input } from '@angular/core';
 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../models/product.model';


@Component({
  selector: 'app-product-details',
  imports: [CommonModule,FormsModule ],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails {
  @Input() product!: Product;
  quantity: number = 1;

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity() {
    this.quantity++;
  }

  getStarsArray(rating: number): number[] {
    const totalStars = 5;
    return Array.from({ length: totalStars }, (_, i) => i + 1);
  }
}
