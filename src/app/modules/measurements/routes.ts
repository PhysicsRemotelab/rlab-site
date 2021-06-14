import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MeasurementsPageComponent } from './page/measurements-page';

const MEASUREMENTS_ROUTE = '';

const routes: Routes = [
  {
    path: MEASUREMENTS_ROUTE,
    component: MeasurementsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeasurementsRoutingModule { }
