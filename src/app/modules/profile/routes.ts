import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './page/profile-page';

const PROFILE_HOME_ROUTE = '';

const routes: Routes = [
    {
        path: PROFILE_HOME_ROUTE,
        component: ProfilePageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule {}
