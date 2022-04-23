import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LabsService } from '../../labs/state/labs.service';
import { Lab } from '../../labs/model';
import { lab2Camera, lab1Sensor } from 'src/environments/environment';
import { webSocket } from 'rxjs/webSocket';

@Component({
    selector: 'app-lab1-page',
    templateUrl: './lab1-page.html',
    styleUrls: ['./lab1-page.scss']
})
export class Lab1PageComponent implements OnInit, OnDestroy {
    labCode = 'diode_efficiency_1';
    lab: Lab;
    booking: any;
    takenUntil = null;
    measurementStarted = false;
    measurementResult = [];
    cameraUrl = lab2Camera;
    sensorUrl = lab1Sensor;
    subject = webSocket('');
    turnedOn = false;

    constructor(private labService: LabsService, private router: Router) {
        if (this.router.getCurrentNavigation().extras.state) {
            this.booking = this.router.getCurrentNavigation().extras.state.booking;
            this.lab = this.booking.lab;
            this.takenUntil = this.booking.takenUntil;
        } else if (!this.lab) {
            this.labService.checkBooking(1).subscribe((booking) => {
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

    turnOn(): void {
        console.log('Turn on');
        this.turnedOn = true;
        this.subject.next('i');
    }

    turnOff(): void {
        console.log('Turn off');
        this.turnedOn = false;
        this.subject.next('o');
    }
}
