import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Home } from './home/home';
import { Product } from './product/product';
import { Dashbord } from './admin/dashbord/dashbord';
import { AdminLayout } from './admin/admin-layout/admin-layout';

export const routes: Routes = [
  {
    path: '',
    title: 'Touriste - Accueil',
    component: Layout, // Layout with header/footer
    children: [
      { path: '', component: Home },
      {
        path: 'home',
        redirectTo: '',
        pathMatch: 'full',
      },
      { path: 'product-item', component: Product },
    ],
  },
  {
    path: 'admin',
    component: AdminLayout,
    children: [
      { path: 'dashboard', component: Dashbord },
      
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '' },
];
