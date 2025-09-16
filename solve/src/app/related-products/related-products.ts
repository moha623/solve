import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Product } from '../models/product.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-related-products',
  imports: [CommonModule, RouterModule],
  templateUrl: './related-products.html',
  styleUrl: './related-products.css',
})
export class RelatedProducts {
   @Input() relatedProducts: any[] = [];
  product!: Product;
  // relatedProduct: Product[] = [];
  quantity: number = 1;

  constructor(private route: ActivatedRoute, private productService: ProductService) {}
  getStarsArray(rating: number): number[] {
    const totalStars = 5;
    return Array.from({ length: totalStars }, (_, i) => i + 1);
  }

  handleImageError(event: any) {
    event.target.src = 'path/to/placeholder/image.jpg';
  }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');

    if (productId) {
      this.loadProduct(productId);
     
    }
  }

  async loadProduct(id: string) {
    try {
      this.product = await this.productService.getProduct(id);
    } catch (error) {
      console.error('Error loading product:', error);
    }
  }
}
