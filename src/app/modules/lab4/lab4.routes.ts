import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Lab4PageComponent } from './page/lab4-page';

const LAB5_HOME_ROUTE = '';

const routes: Routes = [
    {
        path: LAB5_HOME_ROUTE,
        component: Lab4PageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Lab4RoutingModule {}
