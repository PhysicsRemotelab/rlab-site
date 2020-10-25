import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilePageComponent } from './ui/profile-page';

const PROFILE_HOME_ROUTE = '';

const routes: Routes = [
  {
    path: PROFILE_HOME_ROUTE,
    component: ProfilePageComponent,
    children: [
      {
        path: PROFILE_HOME_ROUTE,
        component: ProfilePageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
