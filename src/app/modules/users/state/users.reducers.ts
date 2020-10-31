import { User } from '../model';
import { getUsersSuccess } from './users.actions';
import { createReducer, on, Action } from '@ngrx/store';

export interface UsersState {
    usersReducer?: {
        users: User[];
    };
}

export const INITIAL_STATE: UsersState = {
    usersReducer: {
        users: []
    }
};

const reducer = createReducer(
    INITIAL_STATE,
    on(getUsersSuccess, (state, result) => ({ ...state, users: result.users }))
);

export function usersReducer(state: UsersState | undefined, action: Action): UsersState {
    return reducer(state, action);
}
