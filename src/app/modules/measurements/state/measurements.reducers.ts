import { Measurement } from '../model';
import { getMeasurementsSuccess } from './measurements.actions';
import { createReducer, on, Action } from '@ngrx/store';

export interface MeasurementsState {
    measurementReducer?: {
        measurements: Measurement[];
    };
}

export const INITIAL_STATE: MeasurementsState = {
    measurementReducer: {
        measurements: []
    }
};

const reducer = createReducer(
    INITIAL_STATE,
    on(getMeasurementsSuccess, (state, result) => ({ ...state, measurements: result.measurements }))
);

export function measurementsReducer(state: MeasurementsState | undefined, action: Action): MeasurementsState {
    return reducer(state, action);
}
