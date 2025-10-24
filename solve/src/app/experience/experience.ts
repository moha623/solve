import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ScrollAnimationDirective } from '../scroll-animation.directive';
interface Slide {
  image: string;
  name: string;
  description: string;
  link: string;
}

@Component({
  selector: 'app-experience',
  imports: [CommonModule, ScrollAnimationDirective],
  templateUrl: './experience.html',
  styleUrls: ['./experience.css'],
 
})
export class Experience implements OnInit, AfterViewInit {
  @ViewChild('rotatingSvg') rotatingSvg!: ElementRef<SVGSVGElement>;
  currentSlideIndex = 0;
  isPaused: boolean = false;
  isReversed: boolean = false;

  slides: Slide[] = [
    {
      name: 'Scotland',
      description: 'Experience the mystical Highlands under twilight skies and misty lochs.',
      image:
        'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: 'https://github.com/MDJAmin',
    },
    {
      name: 'Norway',
      description: 'Chase the Northern Lights under star-lit skies along scenic fjord roads.',
      image:
        'https://images.unsplash.com/photo-1439792675105-701e6a4ab6f0?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: 'https://github.com/MDJAmin',
    },
    {
      name: 'New Zealand',
      description: 'Wander dramatic, mist-laden mountain paths that feel straight out of a dream.',
      image:
        'https://images.unsplash.com/photo-1483982258113-b72862e6cff6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: 'https://github.com/MDJAmin',
    },
    {
      name: 'Japan',
      description: 'Discover serene mountain temples shrouded in dusk and ancient forest trails.',
      image:
        'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: 'https://github.com/MDJAmin',
    },
  ];

  constructor() {}
  ngOnInit() {
    window.scrollTo(0, 0);
    // Auto-slide every 5 seconds
    setInterval(() => {
      this.nextSlide();
    }, 5000);
  }
  @ViewChild('sectionThree') sectionThree!: ElementRef;

  isInViewport = false;

  ngAfterViewInit() {
    this.updateSvgClasses();
    const observer = new IntersectionObserver(([entry]) => {
      this.isInViewport = entry.isIntersecting;
    }, {
      threshold: 0.5 // Trigger when 50% of the element is visible
    });

    observer.observe(this.sectionThree.nativeElement);
  }
 

  startRotation(): void {
    this.isPaused = false;
    this.isReversed = false;
    this.updateSvgClasses();
  }

  pauseRotation(): void {
    this.isPaused = true;
    this.updateSvgClasses();
  }

  toggleReverse(): void {
    this.isReversed = !this.isReversed;
    this.updateSvgClasses();
  }

  private updateSvgClasses(): void {
    setTimeout(() => {
      if (this.rotatingSvg && this.rotatingSvg.nativeElement) {
        const svgElement = this.rotatingSvg.nativeElement;

        // First ensure rotating class is always present
        svgElement.classList.add('rotating');

        // Remove animation control classes
        svgElement.classList.remove('paused', 'reverse');

        // Add appropriate classes based on state
        if (this.isPaused) {
          svgElement.classList.add('paused');
        } else if (this.isReversed) {
          svgElement.classList.add('reverse');
        }

        console.log('SVG Classes:', svgElement.classList);
      }
    });
  }

  // Getter methods for button active states
  get isRotateActive(): boolean {
    return !this.isPaused && !this.isReversed;
  }

  get isPauseActive(): boolean {
    return this.isPaused;
  }

  get isReverseActive(): boolean {
    return this.isReversed && !this.isPaused;
  }

  nextSlide(): void {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
  }
}
