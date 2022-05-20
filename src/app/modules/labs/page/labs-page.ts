import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { BookingService } from '../../booking/state/booking.service';
import { Lab } from '../model';
import { LabsService } from '../state/labs.service';

@Component({
    selector: 'app-labs-page',
    templateUrl: './labs-page.html',
    styleUrls: ['./labs-page.scss']
})
export class LabsPageComponent implements OnInit {
    labs: Lab[];
    isAuthenticated = !!sessionStorage.getItem('email');
    currentUserId = sessionStorage.getItem('user_id');
    userEmail = sessionStorage.getItem('email');
    isUsingCurrentLab = false;

    constructor(private router: Router, private labsService: LabsService, private bookingService: BookingService) {}

    ngOnInit(): void {
        console.log('Labs page');
        this.labsService.getLabs().subscribe((labs) => {
            console.log(labs);
            for (let i = 0; i < labs.length; i++) {
                if (!labs[i].bookings) {
                    labs[i].status = 'Start';
                    continue;
                }
                const booking = labs[i].bookings[0];
                if (booking.userId === Number(this.currentUserId)) {
                    labs[i].status = 'Continue';
                    continue;
                }
                if (booking.userId !== Number(this.currentUserId)) {
                    labs[i].status = 'Busy';
                    continue;
                }
            }
            this.labs = labs;
        });
    }

    startlab(lab: Lab): void {
        console.log(lab);
        let bookDate = moment(new Date()).format('YYYY-MM-DD');
        this.bookingService.createBooking(lab.id, bookDate).subscribe((booking) => {
            this.router.navigate([`/${lab.code}`], { state: { booking } });
        });
    }

    continuelab(lab: Lab): void {
        console.log(lab);
        let bookDate = moment(new Date()).format('YYYY-MM-DD');
        this.bookingService.createBooking(lab.id, bookDate).subscribe((booking) => {
            this.router.navigate([`/${lab.code}`], { state: { booking } });
        });
    }

    isContinueButtonActive(lab: Lab): boolean {
        return lab.status === 'Continue';
    }

    isBusyButtonActive(lab: Lab): boolean {
        return lab.status === 'Busy';
    }

    isStartButtonActive(lab: Lab): boolean {
        return lab.status === 'Start';
    }

    isLabAvailable(lab: Lab): boolean {
        return lab.isDisabled;
    }
}
