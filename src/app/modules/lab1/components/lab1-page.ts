import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { interval } from 'rxjs';
import { LabsService } from '../../labs/state/labs.service';
import { MeasurementsService } from '../../measurements/state/measurements.services';

@Component({
  selector: 'app-lab1-page',
  templateUrl: './lab1-page.html',
  styleUrls: ['./lab1-page.scss']
})
export class Lab1PageComponent implements OnInit {

    labId: number;
    measurementStarted = false;
    measurementSaved = false;
    measurementResult = [];
    measurementGenerator: Subscription;

    constructor(
      private route: ActivatedRoute,
      private measurementsService: MeasurementsService,
      private labService: LabsService,
      private router: Router
    ) {
      this.route.queryParams.subscribe(params => {
        this.labId = +params.id;
      });
    }

    ngOnInit(): void {
      console.log('Lab 1 page');
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
      this.measurementGenerator.unsubscribe();
    }

    saveMeasurements(): void {
      console.log('save');
      this.measurementsService.saveMeasurements(this.labId, this.measurementResult.toString()).subscribe(res => {
        console.log(res);
      });
    }

    freeLab(): void {
      this.labService.freeLab(this.labId).subscribe(result => {
        console.log(result);
        this.router.navigate([`/labs`]);
      });
    }
}
