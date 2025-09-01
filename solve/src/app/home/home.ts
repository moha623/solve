 
 import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Homeservice } from '../services/homeservice';
 
import { BrowserModule } from '@angular/platform-browser';
import { Product } from '../models/product.model';
 
 



@Component({
  selector: 'app-home',
  imports: [RouterLink,     ],
  templateUrl: './home.html',
  styleUrl: './home.css',
 
})
export class Home {
products: Product[] = [];
  isLoading = false;
  totalItems = 0;
  currentPage = 1;
  itemsPerPage = 6;
  totalPages = 0;

  constructor(private homeService: Homeservice) {}

  ngOnInit() {
    this.loadProducts();
  }

  async loadProducts() {
    this.isLoading = true;
    try {
      // Fetch total count
      const count = await this.homeService.countProducts();
      this.totalItems = count || 0;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

      // Calculate range for pagination
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = this.currentPage * this.itemsPerPage - 1;

      // Fetch paginated products
      this.products = await this.homeService.getProductsRange(start, end);
      console.log(this.products);
    } catch (error) {
      console.error('Error loading products:', error);
      this.products = [];
    } finally {
      this.isLoading = false;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadProducts();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadProducts();
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadProducts();
    }
  }
 handleImageError(event: any) {
  event.target.src = 'path/to/placeholder/image.jpg';
}
}
