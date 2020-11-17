import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { interval } from 'rxjs';
import { Lab } from '../../labs/model';
import { LabsService } from '../../labs/state/labs.service';
import { MeasurementsService } from '../../measurements/state/measurements.services';

@Component({
  selector: 'app-lab2-page',
  templateUrl: './lab2-page.html',
  styleUrls: ['./lab2-page.scss']
})
export class Lab2PageComponent implements OnInit {

    lab: Lab;
    measurementStarted = false;
    measurementSaved = false;
    measurementResult = [];
    measurementGenerator: Subscription;
    isSaveButtonDisabled = true;

    constructor(
      private measurementsService: MeasurementsService,
      private labService: LabsService,
      private router: Router
    ) {
      this.lab = this.router.getCurrentNavigation().extras.state.lab;
    }

    ngOnInit(): void {
      console.log('Lab 2 page');
    }

    startMeasuremenet(): void {
      this.measurementStarted = true;
      this.measurementResult = [];

      this.measurementGenerator = interval(1000).subscribe(x => {
        const nr = Math.floor((Math.random() * 100) + 1);
        this.measurementResult.push(nr);
      });
    }

    stopMeasuremenet(): void {
      this.measurementStarted = false;
      this.isSaveButtonDisabled = false;
      this.measurementGenerator.unsubscribe();
    }

    saveMeasurements(): void {
      console.log('save');
      this.measurementsService.saveMeasurements(this.lab.id, this.measurementResult.toString()).subscribe(res => {
        console.log(res);
        this.isSaveButtonDisabled = true;
      });
    }

    freeLab(): void {
      this.labService.freeLab(this.lab.id).subscribe(result => {
        console.log(result);
        this.router.navigate([`/labs`]);
      });
    }
}
