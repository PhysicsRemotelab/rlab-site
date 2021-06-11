import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

const ROUTES = {
  home: '',
  labs: 'labs',
  measurements: 'measurements',
  profile: 'profile',
  lab1: 'lab1',
  lab2: 'lab2',
  lab3: 'lab3',
  lab4: 'lab4',
  lab5: 'lab5',
  lab6: 'lab6'
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
    path: ROUTES.lab1,
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/lab1/lab1.module').then(m => m.Lab1Module)
  },
  {
    path: ROUTES.lab2,
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/lab2/lab2.module').then(m => m.Lab2Module)
  },
  {
    path: ROUTES.lab3,
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/lab3/lab3.module').then(m => m.Lab3Module)
  },
  {
    path: ROUTES.lab4,
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/lab4/lab4.module').then(m => m.Lab4Module)
  },
  {
    path: ROUTES.lab5,
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/lab5/lab5.module').then(m => m.Lab5Module)
  },
  {
    path: ROUTES.lab6,
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/lab6/lab6.module').then(m => m.Lab6Module)
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
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
