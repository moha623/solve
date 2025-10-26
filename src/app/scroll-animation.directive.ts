import { Directive, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';

@Directive({
  selector: '[appScrollAnimation]',
})
export class ScrollAnimationDirective implements OnInit, OnDestroy {
  private observer: IntersectionObserver | undefined;
  private hasAnimated = false;

  @Input() threshold = 0.15; // Slightly increased threshold for better timing
  @Input() rootMargin = '0px 0px 0px 0px'; // Trigger when element enters from bottom
  @Input() animationDelay = 0; // Default delay in ms

  constructor(private el: ElementRef) {}

  ngOnInit() {
    // Set initial state
    this.setInitialState();
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  private setInitialState() {
    const element = this.el.nativeElement;
    
    // Add base animation class
    element.classList.add('scroll-animated-element');
    
    // Set initial hidden state based on animation type
    const animationType = element.getAttribute('data-animation') || 'fade-in-right';
    
    switch(animationType) {
      case 'fade-in-right':
        element.classList.add('animate-hidden-right');
        break;
      case 'fade-in-left':
        element.classList.add('animate-hidden-left');
        break;
      default:
        element.classList.add('animate-hidden-right');
    }

    // Apply custom delay if provided
    if (this.animationDelay > 0) {
      element.style.setProperty('--animation-delay', `${this.animationDelay}ms`);
    }
  }

  private setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: this.rootMargin,
      threshold: this.threshold,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.hasAnimated) {
          setTimeout(() => {
            this.animateElement();
          }, this.animationDelay);
          this.hasAnimated = true;
        }
      });
    }, options);

    this.observer.observe(this.el.nativeElement);
  }

  private animateElement() {
    const element = this.el.nativeElement;
    
    // Remove hidden classes
    element.classList.remove('animate-hidden-right', 'animate-hidden-left');
    
    // Add active animation class
    element.classList.add('animate-active');
    
    // Add specific animation class
    const animationType = element.getAttribute('data-animation') || 'fade-in-right';
    element.classList.add(`animate-${animationType}`);
  }
}