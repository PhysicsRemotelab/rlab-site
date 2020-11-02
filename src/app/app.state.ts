import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { measurementsReducer, MeasurementsState } from './modules/measurements/state/measurements.reducers';

export interface AppState {
  measurementsReducer: MeasurementsState;
}

export const reducers: ActionReducerMap<AppState> = {
  measurementsReducer
};

export const metaReducers: MetaReducer<any>[] = [debug];

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log(`%c${action.type}`, 'color: blue', action);
    console.log(`%c[App State]`, 'color: green', state);
    return reducer(state, action);
  };
}
