import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getMeasurements } from '../state/measurements.actions';
import { MeasurementsState } from '../state/measurements.reducers';
import { MeasurementsSelector } from '../state/measurements.selectors';
import { MeasurementsService } from '../state/measurements.services';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { Measurement } from '../model';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-measurements-page',
  templateUrl: './measurements-page.html',
  styleUrls: ['./measurements-page.scss']
})
export class MeasurementsPageComponent implements OnInit {

  measurements = [];
  displayedColumns: string[] = ['id', 'lab', 'name', 'created', 'actions'];

    constructor(
      private store: Store<MeasurementsState>,
      private measurementsService: MeasurementsService,
      private measurementsSelector: MeasurementsSelector
    ) { }

    ngOnInit(): void {
      console.log('Measurements page');

      this.store.dispatch(getMeasurements());

      this.store.pipe(select(this.measurementsSelector.getMeasurements())).subscribe(measurements => {
        console.log(measurements);
        this.measurements = measurements;
      });
    }

    deleteMeasurement(id: number): void {
      this.measurementsService.deleteMeasurement(id).subscribe(res => {
        console.log(res);
        this.store.dispatch(getMeasurements());
      });
    }

    downloadCsv(id: number): void {
      const options = {
        fieldSeparator: ',',
        quoteStrings: '"',
        title: 'Results',
        headers: ['Measurement ID', 'Lab ID', 'Name', 'Result', 'Created at'],
        eol: '\n'
      };

      let output = this.measurements;

      if (id !== -1) {
        output = this.measurements.filter((item: Measurement) => {
          return [id].indexOf(item.id) !== -1;
        }); 
      }

      output = output.map((item: Measurement) => {
        return {
          id: item.id,
          labId: item.labId,
          name: item.name,
          result: item.result,
          createdAt: item.createdAt
        };
      });

      new ngxCsv(output, 'Measurements', options);
    }

}
