import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

const ROUTES = {
    home: '',
    labs: 'labs',
    measurements: 'measurements',
    profile: 'profile',
    lab1: 'diode_efficiency_1',
    lab2: 'light_spectroscopy_1',
    lab3: 'gamma_spectroscopy_1',
    lab4: 'fluorescence_spectroscopy_1',
    lab5: 'temperature_resistance_1',
    lab6: 'light_diffraction_1'
};

const routes: Routes = [
    {
        path: ROUTES.home,
        canActivate: [],
        loadChildren: () => import('./modules/home/module').then((m) => m.HomePageModule)
    },
    {
        path: ROUTES.labs,
        canActivate: [],
        loadChildren: () => import('./modules/labs/module').then((m) => m.LabsPageModule)
    },
    {
        path: ROUTES.lab2,
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/lab2/lab2.module').then((m) => m.Lab2Module)
    },
    {
        path: ROUTES.lab3,
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/lab3/lab3.module').then((m) => m.Lab3Module)
    },
    {
        path: ROUTES.lab4,
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/lab4/lab4.module').then((m) => m.Lab4Module)
    },
    {
        path: ROUTES.lab5,
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/lab5/lab5.module').then((m) => m.Lab5Module)
    },
    {
        path: ROUTES.profile,
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/profile/module').then((m) => m.ProfilePageModule)
    },
    {
        path: ROUTES.measurements,
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/measurements/module').then((m) => m.MeasurementsPageModule)
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
