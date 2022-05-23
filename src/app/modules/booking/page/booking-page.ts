import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LabsService } from '../../labs/state/labs.service';
import { BookingService } from '../state/booking.service';
import * as moment from 'moment';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Booking } from '../booking.model';
import { MatSort } from '@angular/material/sort';
import { Lab } from '../../labs/model';

@Component({
    selector: 'app-booking-page',
    templateUrl: './booking-page.html',
    styleUrls: ['./booking-page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class BookingPageComponent implements OnInit {
    constructor(private bookingService: BookingService, private labService: LabsService) {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();
        const currentDay = new Date().getDate();
        this.minDate = new Date(currentYear, currentMonth, currentDay);
        this.maxDate = new Date(currentYear, 11, 31);
    }

    displayedColumns: string[] = ['id', 'labName', 'takenFrom', 'takenUntil', 'isCancelled', 'actions'];
    dataSource: MatTableDataSource<Booking>;

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
        return '';
    };

    dateFilter = (date: Date): boolean => {
        return true;
    };

    minDate: Date;
    maxDate: Date;
    labs = [];
    selectedLab = '';
    isDisabled: boolean = true;

    bookingForm = new FormGroup({
        labId: new FormControl('', Validators.required),
        bookDate: new FormControl('', Validators.required)
    });

    ngOnInit(): void {
        console.log('Booking page');
        this.bookingService.getBookings().subscribe((bookings: Booking[]) => this.setDataSource(bookings));
        this.labService.getLabs().subscribe((labs: Lab[]) => (this.labs = labs));
    }

    deleteBooking(id: number) {
        this.bookingService.deleteBooking(id).subscribe((res) => {
            this.bookingService.getBookings().subscribe((bookings: Booking[]) => this.setDataSource(bookings));
        });
    }

    onSubmit() {
        console.log(this.bookingForm);
        const labId = this.bookingForm.value.labId;
        let bookDate = this.bookingForm.value.bookDate;
        bookDate = moment(bookDate).format('YYYY-MM-DDTHH:mm');
        this.bookingService.createBooking(labId, bookDate).subscribe((booking) => {
            this.bookingService.getBookings().subscribe((bookings: Booking[]) => {
                this.setDataSource(bookings);
                this.bookingForm.reset();
                this.isDisabled = true;
            });
        });
    }

    private setDataSource(bookings: Booking[]): void {
        bookings = bookings.map((booking: Booking) => Object.assign(booking, (booking.labName = booking.lab.name)));
        this.dataSource = new MatTableDataSource(bookings);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    onSelect(value: number) {
        this.bookingService.getTakenDays(value).subscribe((result) => {
            const takenDates = result.map((item) => moment(item.takenUntil).format('YYYY-MM-DD'));
            this.isDisabled = false;

            this.dateFilter = (date: Date): boolean => {
                if (!date) return false;

                const testDate = moment(date).format('YYYY-MM-DD');
                const isTaken = takenDates.includes(testDate);
                return !isTaken;
            };

            this.dateClass = (date, view) => {
                if (view === 'month') {
                    const testDate = moment(date);
                    const now = moment().subtract(1, 'days');
                    if (now > testDate) {
                        return '';
                    }
                    const compareTo = moment(date).format('YYYY-MM-DD');
                    const isTaken = takenDates.includes(compareTo);
                    return !isTaken ? 'free-date' : 'taken-date';
                }
                return '';
            };
        });
    }
}
