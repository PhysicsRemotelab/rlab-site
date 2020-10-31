import { createAction, props } from '@ngrx/store';
import { Measurement } from '../model';

export const GET_MEASUREMENTS = 'GET_MEASUREMENTS';
export const GET_MEASUREMENTS_SUCCESS = 'GET_MEASUREMENTS_SUCCESS';

export const getMeasurements = createAction(
    GET_MEASUREMENTS
);

export const getMeasurementsSuccess = createAction(
    GET_MEASUREMENTS_SUCCESS,
    props<{ measurements: Measurement[] }>()
);
