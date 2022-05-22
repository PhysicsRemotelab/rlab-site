import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lab } from '../../labs/model';
import { lab4Camera, lab4Sensor, lab4Commands } from 'src/environments/environment';
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
    commandsUrl = lab4Commands;
    commandServiceSubject = webSocket('');

    constructor(private router: Router) {
        if (this.router.getCurrentNavigation().extras.state) {
            this.booking = this.router.getCurrentNavigation().extras.state.booking;
            this.lab = this.booking.lab;
            this.takenUntil = this.booking.takenUntil;
        } else {
            this.router.navigate(['/labs']);
        }
    }

    ngOnInit(): void {
        this.commandServiceSubject = webSocket(this.commandsUrl);
        this.commandServiceSubject.subscribe();
    }

    getData($event: any): void {
        this.measurementResult = $event;
    }

    getMeasurementStarted($event: boolean): void {
        this.measurementStarted = $event;
    }

    rotateClockwise(): void {
        console.log('rotateClockwise');
        this.commandServiceSubject.next(1);
    }

    rotateCounterClockwise(): void {
        console.log('rotateCounterClockwise');
        this.commandServiceSubject.next(2);
    }

    ngOnDestroy(): void {
        this.commandServiceSubject.unsubscribe();
    }
}
