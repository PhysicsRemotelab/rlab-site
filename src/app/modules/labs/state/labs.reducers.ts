import { Lab } from '../model';
import { getLabsSuccess } from './labs.actions';
import { createReducer, on, Action } from '@ngrx/store';

export interface LabsState {
    labsReducer?: {
        labs: Lab[];
    };
}

export const INITIAL_STATE: LabsState = {
    labsReducer: {
        labs: []
    }
};

const reducer = createReducer(
    INITIAL_STATE,
    on(getLabsSuccess, (state, result) => ({ ...state, labs: result.labs }))
);

export function labsReducer(state: LabsState | undefined, action: Action): LabsState {
    return reducer(state, action);
}
