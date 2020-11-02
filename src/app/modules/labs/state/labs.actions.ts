import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Lab } from '../model';

export const GET_LABS = '[Labs] Get';
export const GET_LABS_SUCCESS = '[Labs] Get Success';
export const GET_LABS_FAIL = '[Labs] Get Fail';

export const USE_LAB = '[Labs] Use';
export const USE_LAB_SUCCESS = '[Labs] Use Success';
export const USE_LAB_FAIL = '[Labs] Use Fail';

export const FREE_LAB = '[Labs] Free';
export const FREE_LAB_SUCCESS = '[Labs] Free Success';
export const FREE_LAB_FAIL = '[Labs] Free Fail';

export const getLabs = createAction(GET_LABS);
export const getLabsSuccess = createAction(GET_LABS_SUCCESS, props<{ labs: Lab[] }>());

export const useLab = createAction(USE_LAB, props<{ id: number }>());
export const useLabSuccess = createAction(USE_LAB_SUCCESS, props<{ update: Update<Lab> }>());
export const useLabFail = createAction(USE_LAB_FAIL, props<{ error: number }>());

export const freeLab = createAction(FREE_LAB, props<{ id: number }>());
export const freeLabSuccess = createAction(FREE_LAB_SUCCESS, props<{ update: Update<Lab> }>());
export const freeLabFail = createAction(FREE_LAB_FAIL, props<{ error: number }>());
