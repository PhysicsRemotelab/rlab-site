import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lab } from '../../labs/model';
import { LabsService } from '../../labs/state/labs.service';
import { lab6Camera, lab6Sensor } from 'src/environments/environment';
import { webSocket } from 'rxjs/webSocket';

@Component({
    selector: 'app-lab6-page',
    templateUrl: './lab6-page.html',
    styleUrls: ['./lab6-page.scss']
})
export class Lab6PageComponent implements OnInit, OnDestroy {
    labCode = 'light_diffraction_1';
    lab: Lab;
    booking: any;
    takenUntil = null;
    measurementResult = [];
    measurementStarted = false;
    measurementSaved = false;
    cameraUrl = lab6Camera;
    sensorUrl = lab6Sensor;
    subject = webSocket('');

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

    ngOnInit(): void {
        console.log('ngOnInit');
        this.subject = webSocket(this.sensorUrl);
        this.subject.subscribe();
    }

    ngOnDestroy(): void {
        this.subject.unsubscribe();
    }

    getData($event: any): void {
        this.measurementResult = $event;
    }

    getMeasurementStarted($event: boolean): void {
        this.measurementStarted = $event;
    }

    rotateClockwise(): void {
        console.log('rotateClockwise');
        this.subject.next(1);
    }

    rotateCounterClockwise(): void {
        console.log('rotateCounterClockwise');
        this.subject.next(2);
    }
}
