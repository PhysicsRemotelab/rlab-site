import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Lab1PageComponent } from './page/lab1-page';

const LAB1_HOME_ROUTE = '';

const routes: Routes = [
    {
        path: LAB1_HOME_ROUTE,
        component: Lab1PageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Lab1RoutingModule {}
