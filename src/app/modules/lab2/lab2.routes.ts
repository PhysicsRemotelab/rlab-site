import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Lab2PageComponent } from './page/lab2-page';

const LAB2_HOME_ROUTE = '';

const routes: Routes = [
  {
    path: LAB2_HOME_ROUTE,
    component: Lab2PageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Lab2RoutingModule { }
