import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { interval } from 'rxjs';
import { LabsService } from '../../labs/state/labs.service';
import { MeasurementsService } from '../../measurements/state/measurements.services';

@Component({
  selector: 'app-lab3-page',
  templateUrl: './lab3-page.html',
  styleUrls: ['./lab3-page.scss']
})
export class Lab3PageComponent implements OnInit {

    labId: number;
    measurementStarted = false;
    measurementSaved = false;
    measurementResult = [];
    measurementGenerator: Subscription;
    isSaveButtonDisabled = true;

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
      console.log('Lab 3 page');
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
      this.measurementsService.saveMeasurements(this.labId, this.measurementResult.toString()).subscribe(res => {
        console.log(res);
        this.isSaveButtonDisabled = true;
      });
    }

    freeLab(): void {
      this.labService.freeLab(this.labId).subscribe(result => {
        console.log(result);
        this.router.navigate([`/labs`]);
      });
    }
}
