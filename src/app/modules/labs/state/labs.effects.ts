import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { LabsService } from './labs.service';
import { Action } from '@ngrx/store';
import { GET_LABS, GET_LABS_SUCCESS, USE_LAB, USE_LAB_SUCCESS } from './labs.actions';

@Injectable()
export class LabsEffects {

    getLabs$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(GET_LABS),
        mergeMap(() => this.labsService.getLabs().pipe(
            map(labs => ({ type: GET_LABS_SUCCESS, labs }))
        ))
    ));

    useLab$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(USE_LAB),
        mergeMap((id: number) => this.labsService.useLab(id).pipe(
            map(lab => ({ type: USE_LAB_SUCCESS, lab }))
        ))
    ));

    constructor(
        private actions$: Actions,
        private labsService: LabsService
    ) { }

}
