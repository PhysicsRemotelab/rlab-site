import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getMeasurements } from '../state/measurements.actions';
import { MeasurementsState } from '../state/measurements.reducers';
import { MeasurementsSelector } from '../state/measurements.selectors';
import { MeasurementsService } from '../state/measurements.services';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { Measurement } from '../model';

@Component({
  selector: 'app-measurements-page',
  templateUrl: './measurements-page.html',
  styleUrls: ['./measurements-page.scss']
})
export class MeasurementsPageComponent implements OnInit {

  measurements = [];
  displayedColumns: string[] = ['id', 'lab', 'result', 'created', 'actions'];

    constructor(
      private store: Store<MeasurementsState>,
      private measurementsService: MeasurementsService,
      private measurementsSelector: MeasurementsSelector
    ) { }

    ngOnInit(): void {
      console.log('Measurements page');

      this.store.dispatch(getMeasurements());

      this.store.pipe(select(this.measurementsSelector.getMeasurements())).subscribe(measurements => {
        this.measurements = measurements;
      });
    }

    deleteMeasurement(id: number): void {
      this.measurementsService.deleteMeasurement(id).subscribe(res => {
        console.log(res);
        this.store.dispatch(getMeasurements());
      });
    }

    downloadCsv(): void {
      const options = {
        fieldSeparator: ',',
        quoteStrings: '"',
        title: 'Results',
        headers: ['Measurement ID', 'Lab ID', 'Result', 'Created at'],
        eol: '\n'
      };
      const output = this.measurements.map((obj: Measurement) => {
        return {
          id: obj.id,
          labId: obj.labId,
          result: obj.result,
          createdAt: obj.createdAt
        };
      });
      // tslint:disable-next-line: no-unused-expression
      new ngxCsv(output, 'Measurements', options);
    }

}
