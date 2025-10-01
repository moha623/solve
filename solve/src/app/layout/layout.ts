import { Component, Renderer2 } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  isHeaderHovered = false;
  isNavVisible = false;
  isHovering = false;
  bodyMarginClass = 'body-menu-hover';
  title = 'Horizontal Slider Demo';


  
  constructor(private renderer: Renderer2) {}


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
    this.isHovering = true;
    this.isNavVisible = true;
    this.renderer.addClass(document.body, this.bodyMarginClass);
  }

  onMenuLeave() {
    this.isHovering = false;
    this.renderer.removeClass(document.body, this.bodyMarginClass);
    // Add a small delay before hiding to prevent flickering
    setTimeout(() => {
      if (!this.isHovering) {
        this.isNavVisible = false;
      }
    }, 300);
  }
  onNavHover() {
    this.isHovering = true;
    this.renderer.addClass(document.body, this.bodyMarginClass);
  }

  onNavLeave() {
    this.isHovering = false;
    this.renderer.removeClass(document.body, this.bodyMarginClass);
    this.isNavVisible = false;
  }

  navigateTo(arg0: string) {
    throw new Error('Method not implemented.');
  }
}
