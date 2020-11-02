import { createAction, props } from '@ngrx/store';
import { Measurement } from '../model';

export const GET_MEASUREMENTS = '[Measurements] Get';
export const GET_MEASUREMENTS_SUCCESS = '[Measurements] Get Success';

export const getMeasurements = createAction(
    GET_MEASUREMENTS
);

export const getMeasurementsSuccess = createAction(
    GET_MEASUREMENTS_SUCCESS,
    props<{ measurements: Measurement[] }>()
);
