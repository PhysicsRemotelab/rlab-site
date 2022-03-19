import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LabsService } from '../../labs/state/labs.service';
import { Lab } from '../../labs/model';
import { lab2Camera, lab2Sensor } from 'src/environments/environment';

@Component({
  selector: 'app-lab2-page',
  templateUrl: './lab2-page.html',
  styleUrls: ['./lab2-page.scss']
})
export class Lab2PageComponent {

    labCode = 'light_spectroscopy_1';
    lab: Lab;
    booking: any;
    takenUntil = null;
    measurementStarted = false;
    measurementResult = [];
    cameraUrl =  lab2Camera;
    sensorUrl = lab2Sensor;

    constructor(
      private labService: LabsService,
      private router: Router
    ) {
      if (this.router.getCurrentNavigation().extras.state) {
        this.booking = this.router.getCurrentNavigation().extras.state.booking;
        this.lab = this.booking.lab;
        this.takenUntil = this.booking.takenUntil;
      } else if (!this.lab) {
        this.labService.getlabBooking(2).subscribe(booking => {
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
