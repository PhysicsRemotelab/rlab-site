import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Booking } from '../booking.model';
import { BookingService } from '../state/booking.service';

@Component({
    selector: 'app-booking-page',
    templateUrl: './booking-page.html',
    styleUrls: ['./booking-page.scss']
})
export class BookingPageComponent implements OnInit {
    constructor(private router: Router, private bookingService: BookingService) {}

    ngOnInit(): void {
        console.log('Booking page');
    }
}
