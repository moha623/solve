 
 import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';// Adjust the import path as necessary

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  // Add other product properties as needed
}

@Component({
  selector: 'app-home',
  imports: [RouterLink,   CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
 
})
export class Home {
 products: any[] = [];
  isLoading = false;
  totalItems = 0;
  currentPage = 1;
  itemsPerPage = 9;  // Adjust as needed
  totalPages = 0;

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit() {
    this.loadProducts();
  }

  async loadProducts() {
    this.isLoading = true;
    try {
      // Fetch total count
      // const countResult = await this.supabaseService.countProducts();
      // this.totalItems = countResult || 0;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

      // Calculate range for pagination
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = this.currentPage * this.itemsPerPage - 1;

      // Fetch paginated products
      // this.products = await this.supabaseService.getProductsRange(start, end);
    } catch (error) {
      console.error('Error loading products:', error);
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
 
}
