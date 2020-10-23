import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
