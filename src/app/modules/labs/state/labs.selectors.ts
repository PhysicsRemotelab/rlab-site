import { LabState } from './labs.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const labFeatureSelector = createFeatureSelector<LabState>('labReducer');

export const getAllLabs = createSelector(labFeatureSelector, state => state.labs);
