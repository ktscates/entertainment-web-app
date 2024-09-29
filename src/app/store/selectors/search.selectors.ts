import { createFeatureSelector, createSelector } from '@ngrx/store'
import { SearchState } from '../reducers/search.reducers'

// Feature selector for the search state
export const selectSearchState = createFeatureSelector<SearchState>('search')

// Selector to get movies from the state
export const selectMoviesAndShows = createSelector(
  selectSearchState,
  (state: SearchState) => state.movies
)

export const selectMovies = createSelector(
  selectSearchState,
  (state: SearchState) => state.movies
)

export const selectShows = createSelector(
  selectSearchState,
  (state: SearchState) => state.shows
)

// Selector to get the error message
export const selectError = createSelector(
  selectSearchState,
  (state: SearchState) => state.error
)
