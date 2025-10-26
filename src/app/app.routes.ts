import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Home } from './watch/home';
import { Experience } from './experience/experience';
import { Technology } from './technology/technology';
import { Register } from './register/register';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: 'experience', component: Experience, title: 'Experience' },
      { path: 'technology', component: Technology, title: 'Technology' },

      { path: '', redirectTo: '/experience', pathMatch: 'full' },
      {
        path: 'watch',
        loadComponent: () => import('./watch/home').then((m) => m.Home),
      },
    ],
  },
  { path: 'register', component: Register, title: 'Register' },
];
