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
            this.labs = labs;
            for (let i = 0; i < labs.length; i++) {
                this.bookingService.checkBooking(labs[i].id).subscribe((booking: any) => {
                    console.log(booking);
                    if (!booking) {
                        this.labs[i].status = 'Start';
                        return;
                    }

                    if (booking?.user?.id == this.currentUserId && !booking?.isCancelled) {
                        this.labs[i].status = 'Continue';
                        return;
                    }

                    if (booking?.user?.id != this.currentUserId) {
                        this.labs[i].status = 'Busy';
                    }
                });
            }
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
