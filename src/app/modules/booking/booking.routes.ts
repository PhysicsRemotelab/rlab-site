import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingPageComponent } from './page/booking-page';

const BOOKING_HOME_ROUTE = '';

const routes: Routes = [
    {
        path: BOOKING_HOME_ROUTE,
        component: BookingPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BookingRoutingModule {}
