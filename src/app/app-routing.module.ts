import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

const ROUTES = {
    home: '',
    labs: 'labs',
    booking: 'booking',
    measurements: 'measurements',
    profile: 'profile',
    diode_efficiency_1: 'diode_efficiency_1',
    light_spectroscopy_1: 'light_spectroscopy_1',
    gamma_spectroscopy_1: 'gamma_spectroscopy_1',
    fluorescence_spectroscopy_1: 'fluorescence_spectroscopy_1',
    temperature_resistance_1: 'temperature_resistance_1',
    light_diffraction_1: 'light_diffraction_1'
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
        path: ROUTES.booking,
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/booking/booking.module').then((m) => m.BookingPageModule)
    },
    {
        path: ROUTES.diode_efficiency_1,
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/lab1/lab1.module').then((m) => m.Lab1Module)
    },
    {
        path: ROUTES.light_spectroscopy_1,
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/lab2/lab2.module').then((m) => m.Lab2Module)
    },
    {
        path: ROUTES.gamma_spectroscopy_1,
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/lab3/lab3.module').then((m) => m.Lab3Module)
    },
    {
        path: ROUTES.fluorescence_spectroscopy_1,
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/lab4/lab4.module').then((m) => m.Lab4Module)
    },
    {
        path: ROUTES.temperature_resistance_1,
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/lab5/lab5.module').then((m) => m.Lab5Module)
    },
    {
        path: ROUTES.light_diffraction_1,
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/lab6/lab6.module').then((m) => m.Lab6Module)
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
