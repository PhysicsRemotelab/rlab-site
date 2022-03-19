import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Lab5PageComponent } from './page/lab5-page';

const LAB5_HOME_ROUTE = '';

const routes: Routes = [
  {
    path: LAB5_HOME_ROUTE,
    component: Lab5PageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Lab5RoutingModule { }
