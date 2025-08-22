import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Home } from './home/home';
import { Product } from './product/product';

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
      {path:'product-item',component:Product}
    ],
  },

  { path: '**', redirectTo: '' },
];
