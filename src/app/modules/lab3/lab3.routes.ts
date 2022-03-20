import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Lab3PageComponent } from './page/lab3-page';

const LAB3_HOME_ROUTE = '';

const routes: Routes = [
    {
        path: LAB3_HOME_ROUTE,
        component: Lab3PageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Lab3RoutingModule {}
