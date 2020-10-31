import { createAction, props } from '@ngrx/store';
import { User } from '../model';

export const GET_USERS = 'GET_USERS';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';

export const getUsers = createAction(
    GET_USERS
);

export const getUsersSuccess = createAction(
    GET_USERS_SUCCESS,
    props<{ users: User[] }>()
);
