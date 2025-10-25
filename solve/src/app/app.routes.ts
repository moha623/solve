import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Home } from './watch/home';
import { Discover } from './discover/discover';
 import { Experience } from './experience/experience';
import { Technology } from './technology/technology';
import { register } from 'module';
import { registerLocaleData } from '@angular/common';
import { Register } from './register/register';

export const routes: Routes = [
  {
    path: '',

    component: Layout,
    // children: [{ path: '', component: Home, pathMatch: 'full',title: 'Watch', }],
    children:[
        { path: 'experience', component: Experience,title: 'Experience' },
    { path: 'technology', component: Technology,title: 'Technology' },
  // { path: 'discover', component: Discover,title: 'Discover' },
  { path: 'watch', component: Home,title: 'Watch' },
  { path: '', redirectTo: '/experience', pathMatch: 'full' },]
  },
  {path:'register',component:Register,title:'Register'}

  // { path: '**', redirectTo: '', pathMatch: 'full' },


  //   { path: 'experience', component: ExperienceComponent },
  // { path: 'technology', component: TechnologyComponent },
  // { path: 'discover', component: DiscoverComponent },
  // { path: 'watch', component: WatchComponent },
  // { path: '', redirectTo: '/experience', pathMatch: 'full' },
];
