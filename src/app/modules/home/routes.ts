import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './page/home-page';

const HOME_ROUTE = '';

const routes: Routes = [
    {
        path: HOME_ROUTE,
        component: HomePageComponent,
        children: [
            {
                path: HOME_ROUTE,
                component: HomePageComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {}
