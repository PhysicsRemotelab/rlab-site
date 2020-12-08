import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { interval } from 'rxjs';
import { Lab } from '../../labs/model';
import { LabsService } from '../../labs/state/labs.service';
import { MeasurementsService } from '../../measurements/state/measurements.services';
import { serverUrl } from '../../../../../env.json';
import { sensorUrl } from '../../../../../env.json';

@Component({
  selector: 'app-lab2-page',
  templateUrl: './lab2-page.html',
  styleUrls: ['./lab2-page.scss']
})
export class Lab2PageComponent {

    lab: Lab;
    measurementStarted = false;
    measurementSaved = false;
    measurementResult = [];
    isSaveButtonDisabled = true;
    cameraUrl =  `${serverUrl}/camera/1`;
    sensorUrl = `${sensorUrl}/gamma`;

    constructor(
      private measurementsService: MeasurementsService,
      private labService: LabsService,
      private router: Router,
      private snackBarRef: MatSnackBar
    ) {
      if (this.router.getCurrentNavigation().extras.state) {
        this.lab = this.router.getCurrentNavigation().extras.state.lab;
      } else if (!this.lab) {
        this.labService.getLab(2).subscribe(lab => {
          console.log(lab);
          this.lab = lab;
        });
      }
    }

    startMeasuremenet(): void {
      this.measurementStarted = true;
      this.measurementResult = [];
    }

    stopMeasuremenet(): void {
      this.measurementStarted = false;
      this.isSaveButtonDisabled = false;
    }

    saveMeasurements(): void {
      this.measurementsService.saveMeasurements(this.lab.id, this.measurementResult.toString()).subscribe(res => {
        this.isSaveButtonDisabled = true;
      });
      this.snackBarRef.open('Saved!', 'Hide', {
        duration: 5000,
        verticalPosition: 'top',
        panelClass: ['snackbar']
      });
    }

    freeLab(): void {
      console.log(this.lab.id);
      this.labService.freeLab(this.lab.id).subscribe(result => {
        this.router.navigate([`/labs`]);
      });
    }

    getData($event: any): void {
      this.measurementResult = $event;
    }
}
