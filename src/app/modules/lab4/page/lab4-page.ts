import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Lab } from '../../labs/model';
import { LabsService } from '../../labs/state/labs.service';

@Component({
    selector: 'app-lab4-page',
    templateUrl: './lab4-page.html',
    styleUrls: ['./lab4-page.scss']
})
export class Lab4PageComponent {
    labCode = 'fluorescence_spectroscopy_1';
    lab: Lab;
    booking: any;
    takenUntil = null;

    constructor(private labService: LabsService, private router: Router) {
        if (this.router.getCurrentNavigation().extras.state) {
            this.booking = this.router.getCurrentNavigation().extras.state.booking;
            this.lab = this.booking.lab;
            this.takenUntil = this.booking.takenUntil;
        } else if (!this.booking) {
            this.labService.getlabBooking(5).subscribe((booking) => {
                console.log(booking);
                this.booking = booking;
                this.lab = this.booking.lab;
                this.takenUntil = this.booking.takenUntil;
            });
        }
    }
}
