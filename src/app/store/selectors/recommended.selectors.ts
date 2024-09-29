// selectors/trending.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { RecommendedMovieState } from '../reducers/recommended.reducers'

export const selectRecommendedMovieState =
  createFeatureSelector<RecommendedMovieState>('recommended')

export const selectRecommendedMovies = createSelector(
  selectRecommendedMovieState,
  (state: RecommendedMovieState) => state.movies
)

export const selectError = createSelector(
  selectRecommendedMovieState,
  (state: RecommendedMovieState) => state.error
)
