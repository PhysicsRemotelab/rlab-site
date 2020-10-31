import { Measurement } from '../model';
import { Injectable } from '@angular/core';
import { MeasurementsState } from './measurements.reducers';

@Injectable({
    providedIn: 'root'
})
export class MeasurementsSelector {

    getMeasurements(): any {
        return (state: MeasurementsState): Measurement[] => state.measurementsReducer.measurements;
    }
}
