import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LabsService } from '../../labs/state/labs.service';
import { MeasurementsService } from '../../measurements/state/measurements.services';
import { Lab } from '../../labs/model';
import { serverUrl } from '../../../../../env.json';
import { sensorUrl } from '../../../../../env.json';

@Component({
  selector: 'app-lab1-page',
  templateUrl: './lab1-page.html',
  styleUrls: ['./lab1-page.scss']
})
export class Lab1PageComponent {

    lab: Lab;
    measurementStarted = false;
    measurementSaved = false;
    measurementResult = [];
    isSaveButtonDisabled = true;
    cameraUrl =  `${serverUrl}/camera/0`;
    sensorUrl = `${sensorUrl}/spectrometer`;
    minutesLeft = null;

    constructor(
      private measurementsService: MeasurementsService,
      private labService: LabsService,
      private router: Router,
      private snackBarRef: MatSnackBar
    ) {
      if (this.router.getCurrentNavigation().extras.state) {
        this.lab = this.router.getCurrentNavigation().extras.state.lab;
      } else if (!this.lab) {
        this.labService.getLab(1).subscribe(lab => {
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
