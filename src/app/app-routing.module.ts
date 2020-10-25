import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

const ROUTES = {
  home: '',
  labs: 'labs',
  measurements: 'measurements',
  profile: 'profile'
};

const routes: Routes = [
  {
    path: ROUTES.labs,
    loadChildren: () => import('./modules/labs/module').then(m => m.LabsPageModule)
  },
  {
    path: ROUTES.profile,
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/profile/module').then(m => m.ProfilePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
