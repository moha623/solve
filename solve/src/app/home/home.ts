import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
  keyframes,
} from '@angular/animations';
import { HybridScroll } from "../hybrid-scroll/hybrid-scroll";
import { ParallaxBackground } from "../parallax-background/parallax-background";
import { ParallaxGridComponent } from "../parallax-grid/parallax-grid";
// import { HybridScroll } from '../hybrid-scroll/hybrid-scroll';
// import { ParallaxBackground } from "../parallax-background/parallax-background";
@Component({
  selector: 'app-home',
  imports: [CommonModule, HybridScroll, ParallaxGridComponent, ParallaxBackground],
  templateUrl: './home.html',
  styleUrl: './home.css',
  animations: [
    // Mobile menu animation
    trigger('mobileMenuAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms ease-in', style({ opacity: 0 }))]),
    ]),
    // Section scroll animation
    trigger('scrollAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    // Product card animation
    trigger('productCardAnimation', [
      transition('hidden => visible', [
        animate(
          '600ms ease-out',
          keyframes([
            style({ opacity: 0, transform: 'translateY(50px) scale(0.9)', offset: 0 }),
            style({ opacity: 0.5, transform: 'translateY(15px) scale(0.95)', offset: 0.5 }),
            style({ opacity: 1, transform: 'translateY(0) scale(1)', offset: 1 }),
          ])
        ),
      ]),
    ]),
  ],
  // Additional animations would be defined here
})
export class Home implements OnInit {

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

  //animations

  currentIndex = 0;

  // Add these properties for animation control
  animationStates: string[] = [];
  private observer!: IntersectionObserver;
  @ViewChild('productSection', { static: false }) productSection!: ElementRef;

  constructor(

 
    private router: Router
  ) {}

  ngOnInit() { 
  }

 
 
 
 
  // Add this to your component class
  ngAfterViewInit() {
    this.initParallax();
  }

  private initParallax() {
    // Passive events check
    let passiveSupported = false;
    try {
      window.addEventListener(
        'test',
        () => {},
        Object.defineProperty({}, 'passive', {
          get: function () {
            passiveSupported = true;
          },
        })
      );
    } catch (err) {}

    // Scroll listener
    addEventListener(
      'scroll',
      () => {
        const parallaxElement = document.querySelector('.parallax') as HTMLElement;
        if (parallaxElement) {
          const height = parallaxElement.getBoundingClientRect().height;
          const percentage = Math.min(Math.max(window.pageYOffset / height, 0), 1);
          document.documentElement.style.setProperty('--pct', percentage.toString());
        }
      },
      passiveSupported ? { passive: true } : false
    );
  }
}
