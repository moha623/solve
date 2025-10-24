import { CommonModule } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ScrollAnimationDirective } from '../scroll-animation.directive';
@Component({
  selector: 'app-technology',
  standalone: true,
  imports: [CommonModule,ScrollAnimationDirective],
  templateUrl: './technology.html',
  styleUrls: ['./technology.css']
})
export class Technology {
  currentSlide = 0;
  intervalId: any;

  slides = ['slide1.jpg', 'slide2.jpg', 'slide3.jpg']; // example slide images

  @ViewChildren('slideRef') slideElements!: QueryList<ElementRef>;
  @ViewChildren('dotRef') dotElements!: QueryList<ElementRef>;

  sections = [
    { 
      text: 'A partridge in a pear tree', 
      image: 'https://images.unsplash.com/photo-1597848212624-e6d4bd7e1e42?w=500&auto=format&fit=crop&q=60'
    },
    { 
      text: 'Two turtle doves', 
      image: 'https://images.unsplash.com/photo-1597848212624-e6d4bd7e1e42?w=500&auto=format&fit=crop&q=60'
    },
    { 
      text: 'Three french hens', 
      image: 'https://images.unsplash.com/photo-1597848212624-e6d4bd7e1e42?w=500&auto=format&fit=crop&q=60'
    },
    { 
      text: 'Four calling birds', 
      image: 'https://images.unsplash.com/photo-1597848212624-e6d4bd7e1e42?w=500&auto=format&fit=crop&q=60'
    },
    { 
      text: 'Five golden rings', 
      image: 'https://images.unsplash.com/photo-1597848212624-e6d4bd7e1e42?w=500&auto=format&fit=crop&q=60'
    },
    { 
      text: 'Six geese-a-laying', 
      image: 'https://images.unsplash.com/photo-1597848212624-e6d4bd7e1e42?w=500&auto=format&fit=crop&q=60'
    },
    { 
      text: 'Seven swans a-swimming', 
      image: 'https://images.unsplash.com/photo-1597848212624-e6d4bd7e1e42?w=500&auto=format&fit=crop&q=60'
    },
    { 
      text: 'Eight maids a-milking', 
      image: 'https://images.unsplash.com/photo-1597848212624-e6d4bd7e1e42?w=500&auto=format&fit=crop&q=60'
    },
    { 
      text: 'Nine ladies dancing', 
      image: 'https://images.unsplash.com/photo-1597848212624-e6d4bd7e1e42?w=500&auto=format&fit=crop&q=60'
    },
    { 
      text: 'Ten lords a-leaping', 
      image: 'https://images.unsplash.com/photo-1597848212624-e6d4bd7e1e42?w=500&auto=format&fit=crop&q=60'
    },
    { 
      text: 'Eleven pipers piping', 
      image: 'https://images.unsplash.com/photo-1597848212624-e6d4bd7e1e42?w=500&auto=format&fit=crop&q=60'
    },
    { 
      text: 'Twelve drummers drumming', 
      image: 'https://images.unsplash.com/photo-1597848212624-e6d4bd7e1e42?w=500&auto=format&fit=crop&q=60'
    }
  ];

  ngOnInit() {
     
    window.scrollTo(0, 0);
    this.intervalId = setInterval(() => this.showSlide(this.currentSlide + 1), 4000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  showSlide(index: number) {
    if (index < 0) index = this.slides.length - 1;
    if (index >= this.slides.length) index = 0;
    this.currentSlide = index;
  }

  onDotClick(index: number) {
    this.showSlide(index);
  }
}
