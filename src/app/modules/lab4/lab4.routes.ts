import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Lab4PageComponent } from './page/lab4-page';

const LAB4_HOME_ROUTE = '';

const routes: Routes = [
  {
    path: LAB4_HOME_ROUTE,
    component: Lab4PageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Lab4RoutingModule { }
