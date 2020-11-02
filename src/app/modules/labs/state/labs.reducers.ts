import { Lab } from '../model';
import { getLabsSuccess, useLabSuccess } from './labs.actions';
import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface LabState extends EntityState<Lab> {
  labs: Lab[];
  error: number;
}

export const adapter: EntityAdapter<Lab> = createEntityAdapter<Lab>();

export const initialState = adapter.getInitialState({ });

export const labReducer = createReducer(
    initialState,
    on(getLabsSuccess, (state, action) => {
      return adapter.setAll(action.labs, { ...state, labs: action.labs });
    }),
    on(useLabSuccess, (state, action) => {
      return adapter.updateOne(action.update, state);
    })
);

export const { selectAll, selectIds } = adapter.getSelectors();
