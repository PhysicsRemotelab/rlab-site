import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lab } from '../../labs/model';
import { lab4Camera, lab4Sensor, lab4Commands } from 'src/environments/environment';
import { webSocket } from 'rxjs/webSocket';
import { Subscription, throttleTime } from 'rxjs';
import { Booking } from '../../booking/booking.model';

@Component({
    selector: 'app-lab4-page',
    templateUrl: './lab4-page.html',
    styleUrls: ['./lab4-page.scss']
})
export class Lab4PageComponent implements OnDestroy, OnInit {
    labCode = 'fluorescence_spectroscopy_1';
    lab: Lab;
    booking: Booking;
    takenUntil = null;
    measurementResult = [];
    measurementStarted: boolean = false;
    measurementSaved: boolean = false;
    cameraUrl: string = lab4Camera;
    sensorUrl: string = lab4Sensor;
    commandsUrl: string = lab4Commands;
    commandServiceSubject = webSocket('');
    gammaSensorSubject = webSocket('');
    dataSourceSubscription: Subscription = new Subscription();
    result: number[] = Array(4095).fill(0);

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

        if (this.measurementStarted) {
            console.log('resume');
            this.gammaSensorSubject = webSocket(this.sensorUrl);
            this.gammaSensorSubject.next('resume');

            this.dataSourceSubscription = this.gammaSensorSubject.pipe(throttleTime(100)).subscribe((result: number[]) => {
                this.result = result;
            });
        } else {
            console.log('pause');
            this.gammaSensorSubject.next('pause');
            this.measurementStarted = false;
            this.result = Array(4095).fill(0);
            this.dataSourceSubscription.unsubscribe();
        }
    }

    writeCommand(command: string): void {
        console.log(command);
        this.gammaSensorSubject.next('reset');
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
        this.dataSourceSubscription.unsubscribe();
        this.commandServiceSubject.unsubscribe();
        this.gammaSensorSubject.unsubscribe();
    }
}
