import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LabsService } from '../../labs/state/labs.service';
import { BookingService } from '../state/booking.service';

@Component({
    selector: 'app-booking-page',
    templateUrl: './booking-page.html',
    styleUrls: ['./booking-page.scss']
})
export class BookingPageComponent implements OnInit {
    constructor(private bookingService: BookingService, private labService: LabsService) {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();
        const currentDay = new Date().getDay();
        this.minDate = new Date(currentYear, currentMonth, currentDay);
        this.maxDate = new Date(currentYear, 11, 31);
    }

    dateFilter = (date: Date): boolean => {
        return true;
    };

    minDate: Date;
    maxDate: Date;
    bookings = [];
    labs = [];
    selectedLab = '';
    displayedColumns: string[] = ['id', 'lab', 'takenFrom', 'takenUntil', 'isCancelled', 'actions'];

    bookingForm = new FormGroup({
        labId: new FormControl('', Validators.required),
        bookDate: new FormControl('', Validators.required)
    });

    isDisabled: boolean = true;

    ngOnInit(): void {
        console.log('Booking page');
        this.bookingService.getBookings().subscribe((bookings) => {
            this.bookings = bookings;
        });
        this.labService.getLabs().subscribe((labs) => (this.labs = labs));
    }

    deleteBooking(id: number) {
        this.bookingService.deleteBooking(id).subscribe((res) => {
            this.bookingService.getBookings().subscribe((result) => {
                this.bookings = result;
            });
        });
    }

    onSubmit() {
        console.log(this.bookingForm);
        this.bookingService.createBooking(this.bookingForm.value.labId, this.bookingForm.value.bookDate).subscribe((booking) => {
            this.bookingService.getBookings().subscribe((bookings) => {
                this.bookings = bookings;
            });
        });
    }

    onSelect(value: number) {
        this.bookingService.getTakenDays(value).subscribe((result) => {
            const takenDates = result.map((item) => new Date(item.takenUntil));
            this.isDisabled = false;
            console.log(takenDates);

            this.dateFilter = (date: Date): boolean => {
                return takenDates.findIndex((taken_date) => date?.toDateString() === taken_date?.toDateString()) !== 0;
            };
        });
    }
}
