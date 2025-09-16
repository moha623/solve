import { Sidebar } from '../sidebar/sidebar';
import { RouterOutlet } from '@angular/router';

import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Order } from '../../models/order.model';
import { SupabaseService } from '../../services/supabase.service';
import { ReactiveFormsModule } from '@angular/forms';

 
@Component({
  selector: 'app-admin-layout',
  imports: [Sidebar, RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {
  constructor(public router: Router, private supabaseService: SupabaseService) {}

isMenuOpen = false;
  isMobile = false;
unreadNotifications = 5;  // example count for notifications
unreadEmails = 8;         // example count for unread emails

  ngOnInit(): void {
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.checkScreenSize.bind(this));
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
    if (!this.isMobile) {
      this.isMenuOpen = true; // Always show sidebar on desktop
    } else {
      this.isMenuOpen = false; // Hide sidebar by default on mobile
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
 
    this.router.navigate(['/login']);
  }
}
