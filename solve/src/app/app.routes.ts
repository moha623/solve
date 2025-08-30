import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Home } from './home/home';
import { Product } from './product/product';
import { Dashbord } from './admin/dashbord/dashbord';
import { AdminLayout } from './admin/admin-layout/admin-layout';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Auth } from './auth/auth';

export const routes: Routes = [
  {
    path: '',
    title: ' Accueil',
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
  {
    path: 'auth',
    component:Auth,
    title: 'Solve - Register/Login',
    children: [
      { path: 'login', component: Login },
      { path: 'register', component: Register },
        { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },

  { path: '**', redirectTo: '' },
];
