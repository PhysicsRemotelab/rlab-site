import { Component, OnInit } from '@angular/core';
import { BookingService } from '../state/booking.service';

@Component({
    selector: 'app-booking-page',
    templateUrl: './booking-page.html',
    styleUrls: ['./booking-page.scss']
})
export class BookingPageComponent implements OnInit {
    constructor(private bookingService: BookingService) {}

    bookings = [];
    displayedColumns: string[] = ['id', 'lab', 'takenFrom', 'takenUntil', 'isCancelled', 'actions'];

    ngOnInit(): void {
        console.log('Booking page');
        this.bookingService.getBookings().subscribe((bookings) => {
            console.log(bookings);
            this.bookings = bookings;
        });
    }

    deleteBooking(id: number) {
        console.log(id);
        this.bookingService.deleteBooking(id).subscribe((res) => {
            console.log(res);
            this.bookingService.getBookings().subscribe((result) => {
                this.bookings = result;
            });
        });
    }
}
