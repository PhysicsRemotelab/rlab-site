import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Lab6PageComponent } from './page/lab6-page';

const LAB6_HOME_ROUTE = '';

const routes: Routes = [
  {
    path: LAB6_HOME_ROUTE,
    component: Lab6PageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Lab6RoutingModule { }
