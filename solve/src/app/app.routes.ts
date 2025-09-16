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
    ],
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],  // Uncommented guard
    component: AdminLayout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashbord },
      { path: 'orders-returns', component: OrderReturns },
    ],
  },
  { path: 'login', component: Login },
  // { path: 'register', component: Register },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  
  // Wildcard route should remain at the end
  { path: '**', redirectTo: '', pathMatch: 'full' },
];