import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LabsPageComponent } from './ui/labs-page';

const LABS_HOME_ROUTE = '';

const routes: Routes = [
  {
    path: LABS_HOME_ROUTE,
    component: LabsPageComponent,
    children: [
      {
        path: LABS_HOME_ROUTE,
        component: LabsPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabsRoutingModule { }
