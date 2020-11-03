import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getMeasurements } from '../state/measurements.actions';
import { MeasurementsState } from '../state/measurements.reducers';
import { MeasurementsSelector } from '../state/measurements.selectors';
import { MeasurementsService } from '../state/measurements.services';

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

}
