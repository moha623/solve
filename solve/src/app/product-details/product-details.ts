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
  selectedImageIndex: number = 0;
  imagePlaceholder: string = 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=1064&q=80';

  // Sample additional images (in a real app, these would come from the product data)
  additionalImages: string[] = [
    'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  ];

  ngOnInit() {
    // If product has additional images, use them instead of sample images
    if (this.product && this.product['media_urls'] && this.product['media_urls'].length > 1) {
      this.additionalImages = this.product['media_urls'].slice(1);
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

  handleImageError(event: any) {
    event.target.src = this.imagePlaceholder;
  }

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
 
  
}
