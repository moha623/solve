import { Component, HostListener } from '@angular/core';
import { FooterComponent } from "../footer/footer";

@Component({
  selector: 'app-discover',
  imports: [],
  templateUrl: './discover.html',
  styleUrl: './discover.css'
})
export class Discover {
  isShrunk = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isShrunk = scrollTop > 50; // threshold for shrinking
  }
 

  chooseTheme(color: string): void {
    // Implement theme switch logic here
    document.documentElement.style.setProperty('--golden-glow', color);
  }
}
