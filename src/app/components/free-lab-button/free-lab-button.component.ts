import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from 'src/app/modules/booking/state/booking.service';

@Component({
    selector: 'app-free-lab-button',
    templateUrl: './free-lab-button.component.html',
    styleUrls: ['./free-lab-button.component.scss']
})
export class FreeLabButtonComponent {
    @Input()
    bookingId: number;

    constructor(private bookingService: BookingService, private router: Router) {}

    cancelBooking(): void {
        this.bookingService.cancelBooking(this.bookingId).subscribe(() => {
            this.router.navigate([`/labs`]);
        });
    }
}
