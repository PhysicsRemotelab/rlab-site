import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { BookingPageComponent } from './page/booking-page';
import { BookingRoutingModule } from './booking.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
    declarations: [BookingPageComponent],
    imports: [
        FormsModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatSelectModule,
        MatInputModule,
        CommonModule,
        RouterModule,
        HttpClientModule,
        BookingRoutingModule,
        MatCardModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatPaginatorModule,
        MatSortModule
    ],
    providers: [DatePipe]
})
export class BookingPageModule {}
