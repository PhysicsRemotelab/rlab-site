import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Lab } from '../../labs/model';
import { LabsService } from '../../labs/state/labs.service';
import { lab3Camera, lab3Sensor } from 'src/environments/environment';

@Component({
  selector: 'app-lab3-page',
  templateUrl: './lab3-page.html',
  styleUrls: ['./lab3-page.scss']
})
export class Lab3PageComponent {

    labCode = 'gamma_spectroscopy_1';
    lab: Lab;
    booking: any;
    takenUntil = null;
    measurementStarted = false;
    measurementResult = [];
    cameraUrl = lab3Camera;
    sensorUrl = lab3Sensor;

    constructor(
      private labService: LabsService,
      private router: Router
    ) {
      if (this.router.getCurrentNavigation().extras.state) {
        this.booking = this.router.getCurrentNavigation().extras.state.booking;
        this.lab = this.booking.lab;
        this.takenUntil = this.booking.takenUntil;
      } else if (!this.lab) {
        this.labService.getlabBooking(3).subscribe(booking => {
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
