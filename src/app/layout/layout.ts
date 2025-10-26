import { Component, Renderer2, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FooterComponent } from "../footer/footer";
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterModule, FooterComponent, CommonModule],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css'],
})
export class Layout {
  isHeaderHovered = false;
  isNavVisible = false;
  isHovering = false;
  bodyMarginClass = 'body-menu-hover';
  title = 'Horizontal Slider Demo';
  isXIcon = false;
  isMobile = false;

  constructor(private renderer: Renderer2, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
      this.checkScreenSize();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
    }
  }

  checkScreenSize() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= 768;
      console.log('Is mobile:', this.isMobile);
      if (!this.isMobile) {
        this.isNavVisible = false;
        this.isXIcon = false;
      }
    }
  }

  toggleNav() {
    if (this.isMobile) {
      this.isXIcon = !this.isXIcon;
      this.isNavVisible = !this.isNavVisible;
      console.log('Nav visible:', this.isNavVisible);
    }
  }

  closeNav() {
    this.isXIcon = false;
    this.isNavVisible = false;
  }

  scrollToTop(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }

  onHeaderHover(hovered: boolean) {
    this.isHeaderHovered = hovered;
  }

  onMenuHover() {
    if (!this.isMobile) {
      this.isHovering = true;
      this.isNavVisible = true;
      this.renderer.addClass(document.body, this.bodyMarginClass);
    }
  }

  onMenuLeave() {
    if (!this.isMobile) {
      this.isHovering = false;
      this.renderer.removeClass(document.body, this.bodyMarginClass);
      setTimeout(() => {
        if (!this.isHovering) {
          this.isNavVisible = false;
        }
      }, 300);
    }
  }

  onNavHover() {
    if (!this.isMobile) {
      this.isHovering = true;
      this.renderer.addClass(document.body, this.bodyMarginClass);
    }
  }

  onNavLeave() {
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
