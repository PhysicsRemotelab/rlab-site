import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LabsService } from '../../labs/state/labs.service';
import { MeasurementsService } from '../../measurements/state/measurements.services';
import { Lab } from '../../labs/model';
import { sensorUrl, serverUrl } from 'src/environments/environment';

@Component({
  selector: 'app-lab5-page',
  templateUrl: './lab5-page.html',
  styleUrls: ['./lab5-page.scss']
})
export class Lab5PageComponent {

    lab: Lab;
    takenUntil = null;
    measurementStarted = false;
    measurementSaved = false;
    measurementResult = [];
    isSaveButtonDisabled = true;
    cameraUrl =  `${serverUrl}/cam/0`;
    sensorUrl = `${sensorUrl}/spectrometer2`;

    constructor(
      private measurementsService: MeasurementsService,
      private labService: LabsService,
      private router: Router,
      private snackBarRef: MatSnackBar
    ) {
      if (this.router.getCurrentNavigation().extras.state) {
        this.lab = this.router.getCurrentNavigation().extras.state.lab;
        this.takenUntil = this.lab.users[0].LabUser.takenUntil;
      } else if (!this.lab) {
        this.labService.getLab(1).subscribe(lab => {
          this.lab = lab;
          this.takenUntil = this.lab.users[0].LabUser.takenUntil;
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
      console.log(this.lab);
      this.labService.freeLab(this.lab.id).subscribe(result => {
        this.router.navigate([`/labs`]);
      });
    }

    getData($event: any): void {
      this.measurementResult = $event;
    }
}
