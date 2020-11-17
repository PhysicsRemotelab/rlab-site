import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LabsService } from '../../labs/state/labs.service';
import { MeasurementsService } from '../../measurements/state/measurements.services';
import { webSocket } from 'rxjs/webSocket';
import { Lab } from '../../labs/model';

@Component({
  selector: 'app-lab1-page',
  templateUrl: './lab1-page.html',
  styleUrls: ['./lab1-page.scss']
})
export class Lab1PageComponent implements OnInit {

    lab: Lab;
    measurementStarted = false;
    measurementSaved = false;
    measurementResult = [];
    isSaveButtonDisabled = true;
    subject = webSocket('wss://localhost:2087/data');

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

    ngOnInit(): void {
      console.log('Lab 1 page');
    }

    startMeasuremenet(): void {
      this.subject = webSocket('wss://localhost:2087/data');
      this.measurementStarted = true;
      this.measurementResult = [];
      this.subject.subscribe((data: any)  => {
        console.log(data);
        this.measurementResult = data;
      });
    }

    stopMeasuremenet(): void {
      this.measurementStarted = false;
      this.isSaveButtonDisabled = false;
      this.subject.unsubscribe();
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
      this.subject.unsubscribe();
    }
}
