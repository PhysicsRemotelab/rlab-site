import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialsPageComponent } from './page/materials-page';

const MATERIALS_HOME_ROUTE = '';

const routes: Routes = [
    {
        path: MATERIALS_HOME_ROUTE,
        component: MaterialsPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MaterialsRoutingModule {}
