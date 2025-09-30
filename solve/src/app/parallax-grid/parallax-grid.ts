import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  HostListener,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';

// Import Parallax from the appropriate package if installed via npm
// Example for 'parallax-js' package:
import Parallax from 'parallax-js';

@Component({
  selector: 'app-parallax-grid',
  templateUrl: './parallax-grid.html',
  styleUrls: ['./parallax-grid.css'],
  imports: [CommonModule],
})
export class ParallaxGridComponent implements OnInit, AfterViewInit {
  private parallaxInstance!: Parallax;
  @ViewChild('scene') sceneElement!: ElementRef;

  images = [
    {
      title: 'Project One',
      url: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg',
      hasPlus: true,
    },
    {
      title: 'Project Two',
      url: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg',
      hasPlus: false,
    },
    {
      title: 'Project Three',
      url: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg',
      hasPlus: true,
    },
    {
      title: 'Project Four',
      url: 'https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg',
      hasPlus: false,
    },
    {
      title: 'Project Five',
      url: 'https://images.pexels.com/photos/733854/pexels-photo-733854.jpeg',
      hasPlus: true,
    },
    {
      title: 'Project Six',
      url: 'https://images.pexels.com/photos/1374295/pexels-photo-1374295.jpeg',
      hasPlus: true,
    },
    {
      title: 'Project Seven',
      url: 'https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg',
      hasPlus: false,
    },
    {
      title: 'Project Eight',
      url: 'https://images.pexels.com/photos/15286/pexels-photo.jpg',
      hasPlus: true,
    },
    {
      title: 'Project Nine',
      url: 'https://images.pexels.com/photos/624015/pexels-photo-624015.jpeg',
      hasPlus: true,
    },
    {
      title: 'Project Ten',
      url: 'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg',
      hasPlus: false,
    },
    {
      title: 'Project Eleven',
      url: 'https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg',
      hasPlus: true,
    },
    {
      title: 'Project Twelve',
      url: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg',
      hasPlus: true,
    },
    {
      title: 'Project One',
      url: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg',
      hasPlus: true,
    },
    {
      title: 'Project Two',
      url: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg',
      hasPlus: false,
    },
    {
      title: 'Project Three',
      url: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg',
      hasPlus: true,
    },
    {
      title: 'Project Four',
      url: 'https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg',
      hasPlus: false,
    },
    {
      title: 'Project Five',
      url: 'https://images.pexels.com/photos/733854/pexels-photo-733854.jpeg',
      hasPlus: true,
    },
    {
      title: 'Project Six',
      url: 'https://images.pexels.com/photos/1374295/pexels-photo-1374295.jpeg',
      hasPlus: true,
    },
    {
      title: 'Project Seven',
      url: 'https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg',
      hasPlus: false,
    },
    {
      title: 'Project Eight',
      url: 'https://images.pexels.com/photos/15286/pexels-photo.jpg',
      hasPlus: true,
    },
    {
      title: 'Project Nine',
      url: 'https://images.pexels.com/photos/624015/pexels-photo-624015.jpeg',
      hasPlus: true,
    },
    {
      title: 'Project Ten',
      url: 'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg',
      hasPlus: false,
    },
    {
      title: 'Project Eleven',
      url: 'https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg',
      hasPlus: true,
    },
    {
      title: 'Project Twelve',
      url: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg',
      hasPlus: true,
    },
  ];
  // images = [
  //     { url: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg', hasMore: false },
  //     { url: 'http://www.caseycallis.com/codepen/img2.jpg', hasMore: true },
  //     { url: 'http://www.caseycallis.com/codepen/img3.jpg', hasMore: true },
  //     { url: 'http://www.caseycallis.com/codepen/img4.jpg', hasMore: false },
  //     { url: 'http://www.caseycallis.com/codepen/img5.jpg', hasMore: true },
  //     { url: 'http://www.caseycallis.com/codepen/img6.jpg', hasMore: true },
  //     { url: 'http://www.caseycallis.com/codepen/img7.jpg', hasMore: false },
  //     { url: 'http://www.caseycallis.com/codepen/img8.jpg', hasMore: true },
  //     { url: 'http://www.caseycallis.com/codepen/img9.jpg', hasMore: true },
  //     { url: 'http://www.caseycallis.com/codepen/img11.jpg', hasMore: false },
  //     // Add other images as needed, matching your source code repetition
  //   ];

  constructor(private el: ElementRef) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  ngAfterViewInit(): void {
    this.setHeight();
    const scene = this.el.nativeElement.querySelector('#scene');
    this.parallaxInstance = new Parallax(scene);

    // Optional: recalc height on window resize if you want to handle via HostListener here too
  }

  @HostListener('window:resize')
  onResize(): void {
    this.setHeight();
  }

  private setHeight(): void {
    const vh = window.innerHeight;
    const projects = vh / 2;

    // Set heights on #scene and .layer.main
    const sceneEl = this.el.nativeElement.querySelector('#scene');
    const layerMainEl = this.el.nativeElement.querySelector('.layer.main');

    if (sceneEl) {
      sceneEl.style.height = `${vh}px`;
    }
    if (layerMainEl) {
      layerMainEl.style.height = `${vh}px`;
    }

    // Set height on each .col and .col a
    const colEls: NodeListOf<HTMLElement> = this.el.nativeElement.querySelectorAll('#scene .col');
    const colAnchorEls: NodeListOf<HTMLElement> =
      this.el.nativeElement.querySelectorAll('#scene .col a');

    colEls.forEach((col) => (col.style.height = `${projects}px`));
    colAnchorEls.forEach((a) => (a.style.height = `${projects}px`));
  }
}
