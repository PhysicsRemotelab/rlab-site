import { createAction, props } from '@ngrx/store';
import { Lab } from '../model';

export const GET_LABS = 'GET_LABS';
export const GET_LABS_SUCCESS = 'GET_LABS_SUCCESS';

export const getLabs = createAction(
    GET_LABS
);

export const getLabsSuccess = createAction(
    GET_LABS_SUCCESS,
    props<{ labs: Lab[] }>()
);
