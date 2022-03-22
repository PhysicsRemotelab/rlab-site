import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LabsService } from '../../labs/state/labs.service';
import { Lab } from '../../labs/model';
import { lab1Camera } from 'src/environments/environment';

@Component({
    selector: 'app-lab1-page',
    templateUrl: './lab1-page.html',
    styleUrls: ['./lab1-page.scss']
})
export class Lab1PageComponent {
    labCode = 'diode_efficiency_1';
    lab: Lab;
    booking: any;
    takenUntil = null;
    measurementStarted = false;
    measurementResult = [];
    cameraUrl = lab1Camera;

    constructor(private labService: LabsService, private router: Router) {
        if (this.router.getCurrentNavigation().extras.state) {
            this.booking = this.router.getCurrentNavigation().extras.state.booking;
            this.lab = this.booking.lab;
            this.takenUntil = this.booking.takenUntil;
        } else if (!this.lab) {
            this.labService.getlabBooking(1).subscribe((booking) => {
                console.log(booking);
                this.booking = booking;
                this.lab = this.booking.lab;
                this.takenUntil = this.booking.takenUntil;
            });
        }
    }

    getData($event: any): void {
        this.measurementResult = $event;
    }

    getMeasurementStarted($event: boolean): void {
        this.measurementStarted = $event;
    }
}
