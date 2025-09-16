import { Component, HostListener } from '@angular/core';
import { RouterLink, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink,RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  logout() {
 
    this.router.navigate(['/login']);
  }
}
