import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoryPageComponent } from './ui/history-page';

const HISTORY_ROUTE = '';

const routes: Routes = [
  {
    path: HISTORY_ROUTE,
    component: HistoryPageComponent,
    children: [
      {
        path: HISTORY_ROUTE,
        component: HistoryPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryRoutingModule { }
