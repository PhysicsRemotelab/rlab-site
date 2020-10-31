import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

const ROUTES = {
  home: '',
  labs: 'labs',
  measurements: 'measurements',
  history: 'history',
  profile: 'profile',
  lab1: 'lab1',
  lab2: 'lab2',
  lab3: 'lab3',
  lab4: 'lab4'
};

const routes: Routes = [
  {
    path: ROUTES.home,
    canActivate: [],
    loadChildren: () => import('./modules/home/module').then(m => m.HomePageModule)
  },
  {
    path: ROUTES.labs,
    canActivate: [],
    loadChildren: () => import('./modules/labs/module').then(m => m.LabsPageModule)
  },
  {
    path: ROUTES.history,
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/history/module').then(m => m.HistoryPageModule)
  },
  {
    path: ROUTES.profile,
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/profile/module').then(m => m.ProfilePageModule)
  },
  {
    path: ROUTES.measurements,
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/measurements/module').then(m => m.MeasurementsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
