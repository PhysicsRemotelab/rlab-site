import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookingConfig } from './booking.config';

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    constructor(private http: HttpClient, private bookingConfig: BookingConfig) {}

}
