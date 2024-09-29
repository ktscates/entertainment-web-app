// selectors/trending.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { ShowState } from '../reducers/shows.reducers'

export const selectShowState = createFeatureSelector<ShowState>('show')

export const selectShows = createSelector(
  selectShowState,
  (state: ShowState) => state.shows
)

export const selectError = createSelector(
  selectShowState,
  (state: ShowState) => state.error
)
