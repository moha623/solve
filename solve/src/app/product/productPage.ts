// pages/product-page/product-page.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
 
import { ProductDetails } from "../product-details/product-details";
 
 
import { CommonModule } from '@angular/common';
import { RelatedProducts } from "../related-products/related-products";
import { Product } from '../models/product.model';
 
 
@Component({
  selector: 'app-product',
  imports: [ProductDetails, CommonModule, RelatedProducts],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class ProductPage  {
 product!: Product;
  relatedProducts: Product[] = [];
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    
    if (productId) {
      this.loadProduct(productId);
      this.loadRelatedProducts(productId);
    }
  }

  async loadProduct(id: string) {
    try {
      this.product = await this.productService.getProduct(id);
    } catch (error) {
      console.error('Error loading product:', error);
    }
  }

  async loadRelatedProducts(productId: string) {
    try {
      this.relatedProducts = await this.productService.getRelatedProducts(productId);
    } catch (error) {
      console.error('Error loading related products:', error);
    }
  }

  onQuantityChange(newQuantity: number|any) {
    this.quantity = newQuantity;
  }
}
