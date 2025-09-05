import { Component, HostListener } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  isMenuOpen = false;
  currentPage = 'dashboard';
  isMobile = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
    if (!this.isMobile) {
      this.isMenuOpen = false;
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    if (this.isMobile) {
      this.isMenuOpen = false;
    }
  }

  setActivePage(page: string) {
    this.currentPage = page;
    if (this.isMobile) {
      this.closeMenu();
    }
  }

  logout() {
    // Implement logout functionality here
    console.log('User logged out');
    this.router.navigate(['/login']);
  }
}
