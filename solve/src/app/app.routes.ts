import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Home } from './home/home';
import { Dashbord } from './admin/dashbord/dashbord';
import { AdminLayout } from './admin/admin-layout/admin-layout';
import { Login } from './auth/login/login';
// import { Register } from './auth/register/register';
import { ProductPage } from './product/productPage';
import { OrderReturns } from './admin/order-returns/order-returns';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password';
import { ResetPasswordComponent } from './auth/reset-password/reset-password';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    title: 'Accueil',
    component: Layout,
    children: [
      { path: '', component: Home, pathMatch: 'full' },
      { path: 'product/:id', component: ProductPage },
      // Add more child routes for public pages here if needed
    ],
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    component: AdminLayout,
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashbord },
      { path: 'orders-returns', component: OrderReturns },
      // Other admin routes here
    ],
  },
  { path: 'login', component: Login },
  // { path: 'register', component: Register }, // Uncomment if register is enabled
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },

  // Redirect empty path explicitly if needed
  { path: '', redirectTo: '', pathMatch: 'full' }, 
  
  // Wildcard route to catch all undefined routes and redirect to home or login
  { path: '**', redirectTo: '', pathMatch: 'full' }, 
];
