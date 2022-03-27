import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lab } from '../../labs/model';
import { LabsService } from '../../labs/state/labs.service';
import { lab4Camera, lab4Sensor } from 'src/environments/environment';
import { webSocket } from 'rxjs/webSocket';

@Component({
    selector: 'app-lab4-page',
    templateUrl: './lab4-page.html',
    styleUrls: ['./lab4-page.scss']
})
export class Lab4PageComponent implements OnInit, OnDestroy {
    labCode = 'fluorescence_spectroscopy_1';
    lab: Lab;
    booking: any;
    takenUntil = null;
    measurementResult = [];
    measurementStarted = false;
    measurementSaved = false;
    cameraUrl = lab4Camera;
    sensorUrl = lab4Sensor;
    subject = webSocket('');

    constructor(private labService: LabsService, private router: Router) {
        if (this.router.getCurrentNavigation().extras.state) {
            this.booking = this.router.getCurrentNavigation().extras.state.booking;
            this.lab = this.booking.lab;
            this.takenUntil = this.booking.takenUntil;
        } else if (!this.booking) {
            this.labService.checkBooking(5).subscribe((booking) => {
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
