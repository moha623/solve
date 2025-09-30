import { Component, OnInit, OnDestroy, AfterViewInit, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class FooterComponent implements OnInit, AfterViewInit, OnDestroy {
  phrase = 'NEXT UP-WATCH THE FULL DOCUMENTARY';
  letters: { char: string; active: boolean; visible: boolean }[] = [];

  private animationInterval: any;
  private animationTimeout: any;
  private isAnimating = false;
  private currentIndex = 0;
  private hasAnimated = false;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    // Initialize letters array
    this.letters = this.phrase.split('').map((char) => {
      return { char, active: false, visible: false };
    });
  }

  // Check footer visibility right after component view initialized
  ngAfterViewInit() {
    this.checkFooterVisibility();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkFooterVisibility();
  }

  // Extracted visibility check to reuse on scroll and after init
  private checkFooterVisibility() {
    if (!isPlatformBrowser(this.platformId) || this.hasAnimated) return;

    const footerElement = document.querySelector('.footer-container');
    if (footerElement) {
      const rect = footerElement.getBoundingClientRect();
      const isInViewport = rect.top <= window.innerHeight * 0.7 && rect.bottom >= 0;

      if (isInViewport && !this.isAnimating) {
        this.hasAnimated = true;
        this.startAnimation();
      }
    }
  }

  startAnimation() {
    if (this.isAnimating) return;

    this.isAnimating = true;
    this.currentIndex = 0;

    // Reset all letters
    this.letters.forEach((letter) => {
      letter.active = false;
      letter.visible = false;
    });

    this.animateLetters();
  }

  private animateLetters() {
    if (this.currentIndex >= this.letters.length) {
      this.isAnimating = false;
      return;
    }

    const letter = this.letters[this.currentIndex];

    if (letter.char !== ' ') {
      letter.visible = true;

      this.animationTimeout = setTimeout(() => {
        letter.active = true;
      }, 100);
    }

    this.currentIndex++;

    this.animationInterval = setTimeout(() => {
      this.animateLetters();
    }, 120);
  }

  private clearTimers() {
    if (this.animationInterval) {
      clearTimeout(this.animationInterval);
    }
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }
  }

  ngOnDestroy() {
    this.clearTimers();
  }
}
