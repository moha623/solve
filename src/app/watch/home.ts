import Parallax from 'parallax-js';
import { ScrollAnimationDirective } from '../scroll-animation.directive';
import {
  Component,
  ElementRef,
  HostListener,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
interface FurnitureCard {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, ScrollAnimationDirective],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit {
  private parallaxInstance!: Parallax;
  private isBrowser: boolean;

  constructor(private el: ElementRef, @Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      window.scrollTo(0, 0);
    }
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    this.setHeight();
    const scene = this.el.nativeElement.querySelector('#scene');
    this.parallaxInstance = new Parallax(scene);
    this.initParallax();
  }

  @HostListener('window:resize')
  onResize(): void {
    if (!this.isBrowser) return;
    this.setHeight();
  }

  horizontalImages = [
    {
      src: 'https://images.unsplash.com/photo-1658946376297-629ade5ac607?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29mYSUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D',
      alt: 'Modern sofa',
    },
    {
      src: 'https://plus.unsplash.com/premium_photo-1692179781971-2aa2dbd8bbc0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c29mYSUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D',
      alt: 'Elegant armchair',
    },
    {
      src: 'https://images.unsplash.com/photo-1658946376297-629ade5ac607?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29mYSUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D',
      alt: 'Modern sofa',
    },
    {
      src: 'https://plus.unsplash.com/premium_photo-1692179781971-2aa2dbd8bbc0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c29mYSUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D',
      alt: 'Elegant armchair',
    },
    {
      src: 'https://images.unsplash.com/photo-1658946376297-629ade5ac607?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29mYSUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D',
      alt: 'Modern sofa',
    },
    {
      src: 'https://plus.unsplash.com/premium_photo-1692179781971-2aa2dbd8bbc0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c29mYSUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D',
      alt: 'Elegant armchair',
    },
    {
      src: 'https://images.unsplash.com/photo-1658946376297-629ade5ac607?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29mYSUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D',
      alt: 'Modern sofa',
    },
    {
      src: 'https://plus.unsplash.com/premium_photo-1692179781971-2aa2dbd8bbc0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c29mYSUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D',
      alt: 'Elegant armchair',
    },
    {
      src: 'https://images.unsplash.com/photo-1658946376297-629ade5ac607?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29mYSUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D',
      alt: 'Modern sofa',
    },
    {
      src: 'https://plus.unsplash.com/premium_photo-1692179781971-2aa2dbd8bbc0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c29mYSUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D',
      alt: 'Elegant armchair',
    },
  ];

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
  ];

  cards: FurnitureCard[] = [
    {
      id: 1,
      title: 'كرسي مريح',
      imageUrl:
        'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2Fsb258ZW58MHx8MHx8fDA%3D',
      description: 'كرسي ذو تصميم أنيق ومريح للمنزل.',
    },
    {
      id: 2,
      title: 'طاولة قهوة',
      imageUrl:
        'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2Fsb258ZW58MHx8MHx8fDA%3D',
      description: 'طاولة قهوة عصرية تضيف لمسة جمال لغرفة المعيشة.',
    },
    {
      id: 3,
      title: 'أريكة واسعة',
      imageUrl:
        'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2Fsb258ZW58MHx8MHx8fDA%3D',
      description: 'أريكة مريحة تناسب جميع أفراد العائلة.',
    },
    {
      id: 4,
      title: 'خزانة كتب',
      imageUrl:
        'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2Fsb258ZW58MHx8MHx8fDA%3D',
      description: 'خزانة أنيقة لترتيب كتبك ومقتنياتك.',
    },
    {
      id: 5,
      title: 'طاولة طعام',
      imageUrl:
        'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2Fsb258ZW58MHx8MHx8fDA%3D',
      description: 'طاولة طعام كبيرة لعشاء عائلي مميز.',
    },
    {
      id: 6,
      title: 'مصباح أرضي',
      imageUrl:
        'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2Fsb258ZW58MHx8MHx8fDA%3D',
      description: 'مصباح أرضي يوفر إضاءة دافئة لغرفتك.',
    },
  ];

  private setHeight(): void {
    if (!this.isBrowser) return;
    const vh = window.innerHeight;
    const projects = vh / 2;

    const sceneEl = this.el.nativeElement.querySelector('#scene');
    const layerMainEl = this.el.nativeElement.querySelector('.layer.main');

    if (sceneEl) {
      sceneEl.style.height = `${vh}px`;
    }
    if (layerMainEl) {
      layerMainEl.style.height = `${vh}px`;
    }

    const colEls: NodeListOf<HTMLElement> = this.el.nativeElement.querySelectorAll('#scene .col');
    const colAnchorEls: NodeListOf<HTMLElement> =
      this.el.nativeElement.querySelectorAll('#scene .col a');

    colEls.forEach((col) => (col.style.height = `${projects}px`));
    colAnchorEls.forEach((a) => (a.style.height = `${projects}px`));
  }

  private initParallax() {
    if (!this.isBrowser) return;
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
