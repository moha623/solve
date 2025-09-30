import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Home } from './home/home';
import { Discover } from './discover/discover';

export const routes: Routes = [
  {
    path: '',

    component: Layout,
    // children: [{ path: '', component: Home, pathMatch: 'full',title: 'Watch', }],
    children:[
        //  { path: 'experience', component: ExperienceComponent },
  // { path: 'technology', component: TechnologyComponent },
  { path: 'discover', component: Discover,title: 'discover' },
  { path: 'watch', component: Home,title: 'Watch' },
  { path: '', redirectTo: '/watch', pathMatch: 'full' },]
  },

  // { path: '**', redirectTo: '', pathMatch: 'full' },


  //   { path: 'experience', component: ExperienceComponent },
  // { path: 'technology', component: TechnologyComponent },
  // { path: 'discover', component: DiscoverComponent },
  // { path: 'watch', component: WatchComponent },
  // { path: '', redirectTo: '/experience', pathMatch: 'full' },
];
