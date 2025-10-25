import { Component, Renderer2, HostListener } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FooterComponent } from "../footer/footer";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterModule, FooterComponent, CommonModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  isHeaderHovered = false;
  isNavVisible = false;
  isHovering = false;
  bodyMarginClass = 'body-menu-hover';
  title = 'Horizontal Slider Demo';
  isXIcon = false;
  isMobile = false;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
    console.log('Is mobile:', this.isMobile); // Debug log
    // Auto-close nav when switching from mobile to desktop
    if (!this.isMobile) {
      this.isNavVisible = false;
      this.isXIcon = false;
    }
  }

  toggleNav() {
    console.log('Toggle nav clicked, isMobile:', this.isMobile); // Debug log
    // Only allow toggle on mobile
    if (this.isMobile) {
      this.isXIcon = !this.isXIcon;
      this.isNavVisible = !this.isNavVisible;
      console.log('Nav visible:', this.isNavVisible); // Debug log
    }
  }

  closeNav() {
    this.isXIcon = false;
    this.isNavVisible = false;
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  onHeaderHover(hovered: boolean) {
    this.isHeaderHovered = hovered;
  }

  onMenuHover() {
    // Only trigger hover effects on desktop
    if (!this.isMobile) {
      this.isHovering = true;
      this.isNavVisible = true;
      this.renderer.addClass(document.body, this.bodyMarginClass);
    }
  }

  onMenuLeave() {
    // Only trigger hover effects on desktop
    if (!this.isMobile) {
      this.isHovering = false;
      this.renderer.removeClass(document.body, this.bodyMarginClass);
      // Add a small delay before hiding to prevent flickering
      setTimeout(() => {
        if (!this.isHovering) {
          this.isNavVisible = false;
        }
      }, 300);
    }
  }

  onNavHover() {
    // Only trigger hover effects on desktop
    if (!this.isMobile) {
      this.isHovering = true;
      this.renderer.addClass(document.body, this.bodyMarginClass);
    }
  }

  onNavLeave() {
    // Only trigger hover effects on desktop
    if (!this.isMobile) {
      this.isHovering = false;
      this.renderer.removeClass(document.body, this.bodyMarginClass);
      this.isNavVisible = false;
    }
  }

  navigateTo(arg0: string) {
    throw new Error('Method not implemented.');
  }
}