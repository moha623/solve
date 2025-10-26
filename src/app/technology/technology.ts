import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ScrollAnimationDirective } from '../scroll-animation.directive';

import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-technology',
  standalone: true,
  imports: [CommonModule, ScrollAnimationDirective],
  templateUrl: './technology.html',
  styleUrls: ['./technology.css'],
})
export class Technology {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      window.scrollTo(0, 0);
    }
  }
}
