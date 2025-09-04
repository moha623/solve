import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';
import { Homeservice } from '../services/home.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
navigateTo(arg0: string) {
throw new Error('Method not implemented.');
}
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

  // Image loading states
  imageLoadingStates: { [key: string]: boolean } = {};
  imageErrors: { [key: string]: boolean } = {};

  constructor(private homeService: Homeservice,    private router: Router) {}

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
      console.log('Products loaded:', this.products);
      
      // Initialize loading states
      this.products.forEach(product => {
        this.imageLoadingStates[product.id] = true;
        this.imageErrors[product.id] = false;
      });
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
      this.scrollToTop();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadProducts();
      this.scrollToTop();
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadProducts();
      this.scrollToTop();
    }
  }

  handleImageLoad(productId: string) {
    this.imageLoadingStates[productId] = false;
  }

  handleImageError(event: any, productId: string) {
    console.log('Image error occurred, using placeholder');
    this.imageLoadingStates[productId] = false;
    this.imageErrors[productId] = true;
    
    // Set placeholder image
    event.target.src = 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80';
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

  truncateDescription(description: string | null): string {
    if (!description) return '';
    if (description.length <= 60) return description;
    return description.substring(0, 60) + '...';
  }

  navigateToProduct(productId: string): void {
    this.router.navigate(['/product', productId]);
  }
   // Helper method to calculate discount percentage
calculateDiscount(originalPrice: number, salePrice: number): number {
  if (!originalPrice || originalPrice <= salePrice) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

// Get array of page numbers for pagination
getPagesArray(): number[] {
  return Array(this.totalPages).fill(0).map((x, i) => i + 1);
}

// Get starting index of displayed products
getStartIndex(): number {
  return (this.currentPage - 1) * this.itemsPerPage + 1;
}

// Get ending index of displayed products
getEndIndex(): number {
  return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
}

// Add to cart functionality
addToCart(product: Product): void {
  // Implement your cart functionality here
  console.log('Adding to cart:', product);
  // You can integrate with a cart service here
}
}