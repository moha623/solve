import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';

import { Homeservice } from '../services/homeservice';

import { BrowserModule } from '@angular/platform-browser';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-home',
  imports: [RouterLink,CommonModule],
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
  whatsappNumber = '+21620678780'; 
  whatsappMessage = 'مرحباً، أريد الاستفسار عن خدماتكم';
  isMobileMenuActive = false;
  isScrolled = false;

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
showAllProducts() {
  this.itemsPerPage = 20;
  this.currentPage = 1;
  this.loadProducts();
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

  openWhatsApp() {
    const url = `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(
      this.whatsappMessage
    )}`;
    window.open(url, '_blank');
  }
  toggleMobileMenu(): void {
    this.isMobileMenuActive = !this.isMobileMenuActive;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 300;
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

 
 

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    
    if (this.isMobileMenuActive && 
        mobileMenu && 
        mobileMenuButton &&
        !mobileMenu.contains(event.target as Node) && 
        !mobileMenuButton.contains(event.target as Node)) {
      this.isMobileMenuActive = false;
    }
  }


  

  navigateTo(destination: string): void {
    // Handle navigation based on destination
    this.toggleMobileMenu(); // Close menu after navigation
  }
}
