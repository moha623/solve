import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ScrollAnimationDirective } from '../scroll-animation.directive';
import { RouterLink } from "@angular/router";
interface Slide {
  image: string;
  name: string;
  description: string;
  link: string;
}

@Component({
  selector: 'app-experience',
  imports: [CommonModule, ScrollAnimationDirective, RouterLink],
  templateUrl: './experience.html',
  styleUrls: ['./experience.css'],
 
})
export class Experience    {
  
}
