import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Lab } from '../../labs/model';
import { lab5Camera, lab5Sensor } from 'src/environments/environment';

@Component({
    selector: 'app-lab5-page',
    templateUrl: './lab5-page.html',
    styleUrls: ['./lab5-page.scss']
})
export class Lab5PageComponent {
    labCode = 'temperature_resistance_1';
    selectedSensor = 'sensor1';
    sensors = [
        { value: 'sensor1', viewValue: 'Sensor 1' },
        { value: 'sensor2', viewValue: 'Sensor 2' },
        { value: 'sensor3', viewValue: 'Sensor 3' },
        { value: 'sensor4', viewValue: 'Sensor 4' },
        { value: 'sensor5', viewValue: 'Sensor 5' },
        { value: 'sensor6', viewValue: 'Sensor 6' }
    ];
    lab: Lab;
    booking: any;
    takenUntil = null;
    measurementStarted = false;
    measurementSaved = false;
    measurementResult = [];
    cameraUrl = lab5Camera;
    sensorUrl = lab5Sensor;

    constructor(private router: Router) {
        if (this.router.getCurrentNavigation().extras.state) {
            this.booking = this.router.getCurrentNavigation().extras.state.booking;
            this.lab = this.booking.lab;
            this.takenUntil = this.booking.takenUntil;
        } else {
            this.router.navigate(['/labs']);
        }
    }

    getData($event: any): void {
        this.measurementResult = $event;
    }

    stopEvent(): void {
        this.measurementStarted = false;
    }

    startEvent(): void {
        this.measurementStarted = true;
        this.measurementResult = [];
    }

    getMeasurementStarted($event: boolean): void {
        this.measurementStarted = $event;
    }
}
