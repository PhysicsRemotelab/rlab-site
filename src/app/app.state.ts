import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { usersReducer, UsersState } from './modules/users/state/users.reducers';
import { labsReducer, LabsState } from './modules/labs/state/labs.reducers';
import { measurementsReducer, MeasurementsState } from './modules/measurements/state/measurements.reducers';

export interface AppState {
  usersReducer: UsersState;
  labsReducer: LabsState;
  measurementsReducer: MeasurementsState;
}

export const reducers: ActionReducerMap<AppState> = {
  usersReducer,
  labsReducer,
  measurementsReducer
};

export const metaReducers: MetaReducer<any>[] = [debug];

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}
