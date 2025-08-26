 
 import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RouterLink } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Blogservice } from '../services/blogservice';

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
 
   products: Product[] = [];
  private productsSubscription: Subscription | undefined;
  
  // Pagination variables
  currentPage = 1;
  itemsPerPage = 3;
  totalItems = 0;
  totalPages = 0;
  
  // Loading state
  isLoading = true;
  
  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.loadProductsCount();
    this.loadProducts();
  }

  loadProductsCount(): void {
    this.firestore.collection('products').get().subscribe(snapshot => {
      this.totalItems = snapshot.size;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    });
  }

  loadProducts(): void {
    this.isLoading = true;
    
    // Calculate the starting point based on current page
    const startAt = (this.currentPage - 1) * this.itemsPerPage;
    
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
    
    this.productsSubscription = this.firestore
      .collection('products', ref => 
        ref.orderBy('name').limit(this.itemsPerPage).startAt(startAt)
      )
      .valueChanges({ idField: 'id' })
      .subscribe((products: any[]) => {
        this.products = products;
        this.isLoading = false;
      }, error => {
        console.error('Error fetching products:', error);
        this.isLoading = false;
      });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadProducts();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadProducts();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadProducts();
    }
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
 
 
}
