// selectors/trending.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { MovieState } from '../reducers/movie.reducers'

export const selectMovieState = createFeatureSelector<MovieState>('movie')

export const selectMovies = createSelector(
  selectMovieState,
  (state: MovieState) => state.movies
)

export const selectError = createSelector(
  selectMovieState,
  (state: MovieState) => state.error
)
