// selectors/trending.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { TrendingState } from '../reducers/trending.reducers'

export const selectTrendingState =
  createFeatureSelector<TrendingState>('trending')

export const selectTrendingMovies = createSelector(
  selectTrendingState,
  (state: TrendingState) => state.movies
)

export const selectTrendingError = createSelector(
  selectTrendingState,
  (state: TrendingState) => state.error
)
