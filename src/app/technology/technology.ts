import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ScrollAnimationDirective } from '../scroll-animation.directive';
@Component({
  selector: 'app-technology',
  standalone: true,
  imports: [CommonModule, ScrollAnimationDirective],
  templateUrl: './technology.html',
  styleUrls: ['./technology.css'],
})
export class Technology {
  ngOnInit() {
    window.scrollTo(0, 0);
  }
}
