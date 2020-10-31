import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { GET_MEASUREMENTS, GET_MEASUREMENTS_SUCCESS } from './measurements.actions';
import { MeasurementsService } from './measurements.services';

@Injectable()
export class MeasurementsEffects {

    getMeasurements$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(GET_MEASUREMENTS),
        mergeMap(() => this.measurementsService.geMeasurements().pipe(
            map(measurements => ({ type: GET_MEASUREMENTS_SUCCESS, measurements }))
        ))
    ));

    constructor(
        private actions$: Actions,
        private measurementsService: MeasurementsService
    ) { }

}
