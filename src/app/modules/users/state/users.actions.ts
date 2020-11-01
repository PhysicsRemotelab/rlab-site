import { createAction, props } from '@ngrx/store';
import { User } from '../model';

export const GET_USERS = 'GET_USERS';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const POST_USER = 'POST_USER';
export const POST_USER_SUCCESS = 'POST_USER_SUCCESS';

export const getUsers = createAction(
    GET_USERS
);
export const getUsersSuccess = createAction(
    GET_USERS_SUCCESS,
    props<{ users: User[] }>()
);

export const postUser = createAction(
    POST_USER
);
export const postUserSuccess = createAction(
    POST_USER_SUCCESS,
    props<{ user: User }>()
);
