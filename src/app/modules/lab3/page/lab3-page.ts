import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Lab } from '../../labs/model';
import { LabsService } from '../../labs/state/labs.service';
import { MeasurementsService } from '../../measurements/state/measurements.services';
import { sensorUrl, serverUrl } from 'src/environments/environment';

@Component({
  selector: 'app-lab3-page',
  templateUrl: './lab3-page.html',
  styleUrls: ['./lab3-page.scss']
})
export class Lab3PageComponent {

    selectedSensor = 'sensor1';
    sensors = [
      { value: 'sensor1', viewValue: 'Sensor 1'},
      { value: 'sensor2', viewValue: 'Sensor 2'},
      { value: 'sensor3', viewValue: 'Sensor 3'},
      { value: 'sensor4', viewValue: 'Sensor 4'},
      { value: 'sensor5', viewValue: 'Sensor 5'},
      { value: 'sensor6', viewValue: 'Sensor 6'}
    ];
    lab: Lab;
    measurementStarted = false;
    measurementSaved = false;
    measurementResult = [];
    isSaveButtonDisabled = true;
    cameraUrl =  `${serverUrl}/cam/2`;
    sensorUrl = `${sensorUrl}/resistance`;

    constructor(
      private measurementsService: MeasurementsService,
      private labService: LabsService,
      private router: Router,
      private snackBarRef: MatSnackBar
    ) {
      if (this.router.getCurrentNavigation().extras.state) {
        this.lab = this.router.getCurrentNavigation().extras.state.lab;
      } else if (!this.lab) {
        this.labService.getLab(3).subscribe(lab => {
          console.log(lab);
          this.lab = lab;
        });
      }
    }

    saveMeasurements(): void {
      const result = this.measurementResult.map(res => {
        return [res.x, res.y];
      });
      this.measurementsService.saveMeasurements(this.lab.id, result.toString()).subscribe(res => {
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

    stopEvent(): void {
      this.measurementStarted = false;
      this.isSaveButtonDisabled = false;
    }

    startEvent(): void {
      this.measurementStarted = true;
      this.isSaveButtonDisabled = true;
      this.measurementResult = [];
    }

}
