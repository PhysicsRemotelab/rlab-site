import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookingConfig } from './booking.config';
import { Observable } from 'rxjs';
import { Booking } from '../booking.model';

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    constructor(private http: HttpClient, private bookingConfig: BookingConfig) {}

    getBookings(): Observable<Booking[]> {
        return this.http.get<Booking[]>(this.bookingConfig.getBookingEndpoint());
    }

    deleteBooking(id: number): Observable<number> {
        return this.http.delete<number>(this.bookingConfig.getBookingEndpoint() + '/' + id);
    }
}
