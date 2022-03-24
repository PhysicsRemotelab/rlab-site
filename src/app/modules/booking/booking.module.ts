import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BookingPageComponent } from './page/booking-page';
import { BookingRoutingModule } from './booking.routes';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [BookingPageComponent],
    imports: [CommonModule, RouterModule, HttpClientModule, BookingRoutingModule, MatCardModule, MatButtonModule]
})
export class BookingPageModule {}
