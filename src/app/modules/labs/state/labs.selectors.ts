import { Lab } from '../model';
import { Injectable } from '@angular/core';
import { LabsState } from './labs.reducers';

@Injectable({
    providedIn: 'root'
})
export class LabsSelector {

    getLabs(): any {
        return (state: LabsState): Lab[] => state.labsReducer.labs;
    }
}
