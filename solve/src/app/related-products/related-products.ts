import { Component, Input } from '@angular/core';
 
import { CommonModule } from '@angular/common';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-related-products',
  imports: [CommonModule],
  templateUrl: './related-products.html',
  styleUrl: './related-products.css'
})
export class RelatedProducts {
@Input() relatedProducts!: Product[];

  getStarsArray(rating: number): number[] {
    const totalStars = 5;
    return Array.from({ length: totalStars }, (_, i) => i + 1);
  }
}
