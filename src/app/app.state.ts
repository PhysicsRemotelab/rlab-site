import {routerReducer, RouterReducerState} from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { usersReducer, UsersState } from './modules/users/state/users.reducers';

export interface AppState {
  usersReducer: UsersState;
}

export const appReducers: ActionReducerMap<AppState> = {
  usersReducer
};
