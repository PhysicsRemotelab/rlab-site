import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lab } from '../../labs/model';
import { lab3Camera, lab3Sensor } from 'src/environments/environment';
import { webSocket } from 'rxjs/webSocket';
import { Subscription, throttleTime } from 'rxjs';
import { Booking } from '../../booking/booking.model';

@Component({
    selector: 'app-lab3-page',
    templateUrl: './lab3-page.html',
    styleUrls: ['./lab3-page.scss']
})
export class Lab3PageComponent implements OnDestroy, OnInit {
    labCode = 'gamma_spectroscopy_1';
    lab: Lab;
    booking: Booking;
    takenUntil = null;
    measurementStarted: boolean = false;
    measurementResult = [];
    cameraUrl: string = lab3Camera;
    sensorUrl: string = lab3Sensor;
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
        this.gammaSensorSubject = webSocket(this.sensorUrl);
        this.gammaSensorSubject.subscribe();
    }

    getData($event: any): void {
        this.measurementResult = $event;
    }

    getMeasurementStarted($event: boolean): void {
        this.measurementStarted = $event;

        if (this.measurementStarted) {
            this.gammaSensorSubject = webSocket(this.sensorUrl);

            this.dataSourceSubscription = this.gammaSensorSubject.pipe(throttleTime(100)).subscribe((result: number[]) => {
                console.log(result);
                this.result = result;
            });
        } else {
            this.dataSourceSubscription.unsubscribe();
        }
    }

    writeCommand(command: string): void {
        console.log(command);
        this.gammaSensorSubject.next(command);
        this.measurementStarted = false;
        this.result = Array(4095).fill(0);
        this.dataSourceSubscription.unsubscribe();
    }

    ngOnDestroy(): void {
        this.dataSourceSubscription.unsubscribe();
        this.gammaSensorSubject.unsubscribe();
    }
}
